var express = require("express");
var router = express.Router();
const {
  landingPage,
  detail,
  category,
  checkout,
  history,
  historyDetail,
  dashboard,
  profile,
  editProfile,
} = require("./controller");
const { isLoginPlayer } = require("../../middleware/auth");
const multer = require("multer");
const os = require("os");

router.get("/landing-page", landingPage);
router.get("/category", category);
router.get("/:id/detail", detail);
router.post("/checkout", isLoginPlayer, checkout);
router.get("/history", isLoginPlayer, history);
router.get("/history/:id/detail", isLoginPlayer, historyDetail);
router.get("/dashboard", isLoginPlayer, dashboard);
router.get("/profile", isLoginPlayer, profile);
router.put(
  "/profile",
  isLoginPlayer,
  multer({ dest: os.tmpdir() }).single("image"),
  editProfile
);

module.exports = router;
