import exec from "ssh-exec";

export function sendSMS(text: string, phoneNumber: string) {
  exec(
    `uqmi -d /dev/cdc-wdm0 --send-message ${text} --send-message-target ${phoneNumber}`,
    {
      user: "root",
      host: "192.168.1.1",
      password: "D5nSXrpr"
    }, (err: any, stdout: any, stderr: any) => {
      console.log(err, stdout, stderr);
    });
}