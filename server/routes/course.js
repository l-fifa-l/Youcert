import express from "express";
import { addCourse, getAllCourse, getACourse } from "../controllers/course";
import { requireSignin } from "../middleware";

const router = express.Router();

router.post("/addcourse", requireSignin, addCourse);
router.get("/getallcourse", getAllCourse);
router.get("/course/:id", getACourse);

module.exports = router;
