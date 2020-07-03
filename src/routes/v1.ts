import express from "express";
import auth from "../controllers/v1/auth";
import sms from "../controllers/v1/sms";

const router = express.Router();

// Auth
router.get("/requestToken", auth.requestToken);

// Servertime
router.post("/sms/send", sms.create);

export default router;
