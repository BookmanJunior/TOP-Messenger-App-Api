import { Router } from "express";
import { session_post } from "../Controllers/Session";

const router = Router();

router.post("/", session_post);

export default router;
