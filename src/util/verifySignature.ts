import crypto from "crypto";
import moment from "moment";

export default function(timestamp: number, signature: string) {
  const apiKey = "key";
  const apiSecret = "secret";
  const message = JSON.stringify({ apiKey: apiKey, timestamp: timestamp });
  const jwtTimeoutDuration = parseInt(process.env.JWT_TIMEOUT_DURATION);

  if (moment().unix() - timestamp > jwtTimeoutDuration) {
    throw new Error("Timestamp has expired!");
  }

  const hmac = crypto.createHmac("sha512", apiSecret).update(message);
  const reconstructedSignature = Buffer.from(hmac.digest("base64"));
  const suppliedSignature = Buffer.from(signature);

  return reconstructedSignature.equals(suppliedSignature);
};
