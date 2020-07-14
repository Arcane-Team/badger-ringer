import axios from "axios";
import moment from "moment";
import crypto from "crypto";

export default class BadgerServer {
  token: string = null;
  key: string = "key";
  secret: string = "secret";
  tokenExpiresAt: moment.Moment;

  private signature(timestamp: number) {
    const message = JSON.stringify({ apiKey: this.key, timestamp: timestamp });
    const hmac = crypto.createHmac("sha512", this.secret).update(message);
    return hmac.digest("base64");
  }

  private getToken() {
    if (this.token && this.tokenExpiresAt && this.tokenExpiresAt > moment()) {
      return new Promise((resolve) => {
        return resolve(this.token);
      });
    }

    const timestamp = moment().unix();

    return axios.get("http://192.168.100.1/api/v1/requestToken", {
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": this.key,
        "X-API-Timestamp": timestamp,
        "X-API-Signature": this.signature(timestamp)
      }
    }).then((response: any) => {
      this.token = response.data.token;
      this.tokenExpiresAt = moment.unix(response.data.expires);
      return this.token;
    }).catch((e: any) => {
      console.log(e);
    });
  }

  public sendSMS(text: string, senderPhoneNumber: string, sentAt: string) {
    return this.getToken().then((accessToken) => {
      return axios.post("http://192.168.100.1/api/v1/sms/receive",
        {
          senderPhoneNumber,
          text,
          sentAt
        },
        {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        })
        .then((response: any) => {
          return response;
        }).catch((e: any) => {
          console.log(e);
        });
    });
  }
}
