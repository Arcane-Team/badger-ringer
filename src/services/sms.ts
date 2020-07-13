import exec from "ssh-exec";
import { errorLog } from "../util/logger";

const baseCommand: string = "uqmi -d /dev/cdc-wdm0";
const user: string = "root";
const host: string = "192.168.1.1";
const password: string = "D5nSXrpr";

function execCommand(command: string) {
    return exec(
      command
      , {
        user
        , host
        , password
      }, (err: any, stdout: any, stderr: any) => {
        if (!err) {
          return stdout;
        }

        errorLog.error(stderr);
        return false;
      });
}

export function sendSMS(text: string, phoneNumber: string) {
  return execCommand(`${baseCommand} --send-message ${text} --send-message-target ${phoneNumber}`);
}

export function listSMS() {
  return execCommand(`${baseCommand} --list-messages`);
}

export function getSMS(id: number) {
  return execCommand(`${baseCommand} --get-message ${id}`);
}
