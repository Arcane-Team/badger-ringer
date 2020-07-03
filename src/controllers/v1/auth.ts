import { Request, Response } from "express";
import { successResponse, unauthorizedResponse } from "../../helpers/apiResponse";
import verifySignature from "../../util/verifySignature";
import moment from "moment";
import jwt from "jsonwebtoken";

/**
 * GET /requestToken
 * Request token
 */
const requestToken = (req: Request, res: Response) => {
  const apiKey = req.get("X-API-Key");
  const timestamp = parseInt(req.get("X-API-Timestamp"));
  const signature = req.get("X-API-Signature");

  if (!(apiKey && timestamp && signature)) {
    return unauthorizedResponse(res);
  }

  try {
    if (verifySignature(timestamp, signature)) {
      const now = Date.now();
      const exp = moment(now)
        .add(parseInt(process.env.JWT_TIMEOUT_DURATION) || 600, "seconds")
        .unix();
      const payload = {
        // TODO: Should be searching for the apikey here, and using the associated record
        ulid: "1",
        exp: exp,
        iat: moment(now).unix(),
        role: "Badger"
      };
      const secret = process.env.JWT_SECRET;
      const token = jwt.sign(payload, secret);

      return successResponse(res,
        Object.assign({}, { expires: exp, token })
      );
    }
  } catch (e) {
    // insert error handler if need more than just 401
  }

  return unauthorizedResponse(res);
};

export default {
  requestToken
};
