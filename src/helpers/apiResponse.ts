import { Response } from "express";

export const successResponse = (res: Response, data: { [key: string]: any }) => {
  let responseData = { success: true };
  if (data) {
    responseData = Object.assign({}, responseData, data);
  }
  return res.status(200).json(responseData);
};

export const errorResponse = (res: Response, message: string) => {
  return res.status(500).json({
    success: false,
    message: message,
  });
};

export const notFoundResponse = (res: Response) => {
  return res.status(404).json({
    success: false,
    message: "Not found",
  });
};

export const unauthorizedResponse = (res: Response) => {
  return res.status(401).json({
    success: false,
    message: "Unauthorized",
  });
};

export const validationResponse = (res: Response, errors: { [key: string]: any }) => {
  return res.status(422).json({
    success: false,
    message: "Validation error",
    errors
  });
};
