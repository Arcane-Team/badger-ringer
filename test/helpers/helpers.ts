import crypto from "crypto";

export default class Helper {
  static async apiHeadersValues(timestamp: number) {
    const apiKey = "key";
    const apiSecret = "secret";
    const message = JSON.stringify({ apiKey: apiKey, timestamp: timestamp });
    const hmac = crypto.createHmac("sha512", apiSecret).update(message);
    const apiSignature = hmac.digest("base64");

    return { apiKey, apiSignature, apiTimestamp: timestamp};
  }
}
