import { Router } from "express";
import { session_get, session_post } from "../Controllers/Session";

const router = Router();

router.get("/", session_get);

router.post("/", session_post);

export default router;
