import exec from "ssh-exec";
import { actionLog, errorLog } from "../util/logger";
import { promises as fs } from "fs";
import path from "path";
import BadgerServer from "../services/badgerServer";

const baseCommand: string = "uqmi -d /dev/cdc-wdm0";
const user: string = "root";
const host: string = "192.168.1.1";
const password: string = "D5nSXrpr";

function execCommand(command: string) {
    return new Promise((resolve, reject) => {
      return exec(
        command
        , {
          user
          , host
          , password
        }, (err: any, stdout: any, stderr: any) => {
          if (stdout) {
            resolve(JSON.parse(stdout));
          }

          reject(err);
        });
    });
}

export async function sendSMS(text: string, phoneNumber: string) {
  return await execCommand(`${baseCommand} --send-message ${text} --send-message-target ${phoneNumber}`);
}

export async function listSMS() {
  return await execCommand(`${baseCommand} --list-messages`);
}

export async function getSMS(id: number) {
  return await execCommand(`${baseCommand} --get-message ${id}`);
}

export async function newSMSChecker() {
  try {
    const data = await fs.readFile(path.join(__dirname, "../../../smsCounter.txt"), "utf8");
    console.log(data);
    const lastSMSId = parseInt(data);
    const smsMessages: any = await listSMS();
    const lastNewSMSId = smsMessages[smsMessages.length - 1];

    if (lastNewSMSId) {
      let startSMSId = 0;

      if (lastSMSId) {
        startSMSId = lastSMSId + 1;
      }

      if (lastNewSMSId > startSMSId) {
        for(let i = startSMSId; i <= lastNewSMSId; i++) {
          const newSMS: { [key: string]: any } = await getSMS(i);
          const badgerServer = new BadgerServer();
          await badgerServer.sendSMS(
            newSMS.sender,
            newSMS.text,
            newSMS.timestamp
          );
        }

        await fs.writeFile(path.join(path.join(__dirname, "../../../smsCounter.txt")), lastNewSMSId);
      } else if (lastNewSMSId === startSMSId) {
        actionLog.info("No new sms messages");
      }
    }
  } catch(e) {
    errorLog.error(e);
  }

  // wait between run 10 seconds
  await new Promise(resolve => setTimeout(resolve, 10000));
  newSMSChecker();
}
