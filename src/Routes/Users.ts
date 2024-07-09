import { Router } from "express";
import { user_post } from "../Controllers/User";
const router = Router();

router.post("/", user_post);

export default router;
