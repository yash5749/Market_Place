import { Router } from "express";
import { register, login , logout,resfreshAcessToken, changeCurrentPassword, currentSeller} from "../controllers/seller.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { uploadbike, deleteBike } from "../controllers/bike.controller.js";

const router = Router()

router.route("/register").post(register)
router.route("/login").post(login)

//secured routes
router.route("/logout").post(verifyJwt, logout)
router.route("/refreshaccesstoken").post(resfreshAcessToken)
router.route("/changepassword").post(changeCurrentPassword)
// router.route("/fetchseller").post(verifyJwt,currentSeller)
router.get("/current", verifyJwt, currentSeller);
router.post(
    "/bikeupload",
    verifyJwt,
  upload.fields([{ name: "photos", maxCount: 3 }]),
  uploadbike
);




router.route("/deletebike/:id").delete(verifyJwt, deleteBike )
export default router