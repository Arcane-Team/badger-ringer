import { Request, Response } from "express";
import { successResponse } from "../../helpers/apiResponse";

/**
 * POST /sms/send
 * Send sms message
 */
const create = (req: Request, res: Response) => {
  return successResponse(res, { success: 123 });
};

export default {
  create
};
