require("dotenv").config();
const axios = require("axios");
var argv = require('minimist')(process.argv.slice(2));

function getAll() {
  return axios.get(`${process.env.BADGER_API_URL}/members`, { headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.JWT_SECRET}`
  }}).then(function(result) {
    console.log(result.data.users.map(function(item) {
      return `${item.id} ${item.firstName} ${item.lastName} ${item.email} ${item.createdAt}`;
    }));
  })
}

function create(data) {
  return axios.post(`${process.env.BADGER_API_URL}/members`, data, { headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.JWT_SECRET}`
  }}).then(function(result) {
    const user = result.data.user;
    console.log("Success:")
    console.log(`${user.id} ${user.firstName} ${user.lastName} ${user.email} ${user.createdAt}`);
  }).catch(function(e) {
    console.log(e.response.data);
  })
}

function update(data) {
  const id = data.id;
  delete data.id;
  return axios.post(`${process.env.BADGER_API_URL}/members/${id}`,
    Object.assign({}, data, {_method: "PATCH"}),
    { headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.JWT_SECRET}`
  }}).then(function(result) {
    const user = result.data.user;
    console.log("Success:")
    console.log(`${user.id} ${user.firstName} ${user.lastName} ${user.email} ${user.createdAt}`);
  }).catch(function(e) {
    console.log(e.response.data);
  })
}

function destroy(id) {
  return axios.delete(`${process.env.BADGER_API_URL}/members/${id}`,
    { headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.JWT_SECRET}`
  }}).then(function(result) {
    console.log("Success")
  }).catch(function(e) {
    console.log(e.response.data);
  })
}

switch (argv.c) {
  case "getAll": return getAll();
  case "create": return create(JSON.parse(argv.p));
  case "update": return update(JSON.parse(argv.p));
  case "destroy": return destroy(argv.p);
  default: console.log('no command')
}