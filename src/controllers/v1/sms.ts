import { Request, Response } from "express";
import { successResponse } from "../../helpers/apiResponse";
import { sendSMS } from "../../services/sms";

/**
 * POST /sms/send
 * Send sms message
 */
const create = (req: Request, res: Response) => {
  sendSMS(req.body.text, req.body.phoneNumber);
  return successResponse(res, { success: true });
};

export default {
  create
};
