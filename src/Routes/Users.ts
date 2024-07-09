import { Router } from "express";
import { user_post } from "../Controllers/Users";
const router = Router();

router.post("/", user_post);

export default router;
