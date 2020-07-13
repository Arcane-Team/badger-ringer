import exec from "ssh-exec";

const command: string = "uqmi -d /dev/cdc-wdm0";

export function sendSMS(text: string, phoneNumber: string) {
  return exec(
    `${command} --send-message ${text} --send-message-target ${phoneNumber}`,
    {
      user: "root",
      host: "192.168.1.1",
      password: "D5nSXrpr"
    }, (err: any, stdout: any, stderr: any) => {
      console.log(err, stdout, stderr);
    });
}

export function listSMS() {
  const messages = exec(
    `${command} --list-messages`,
    {
      user: "root",
      host: "192.168.1.1",
      password: "D5nSXrpr"
    }, (err: any, stdout: any, stderr: any) => {
      console.log(err, stdout, stderr);
    });
  console.log(messages);
}