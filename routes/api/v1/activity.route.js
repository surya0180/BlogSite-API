const express = require("express");

const authMiddleware = require("../../../middlewares/auth.middleware");

const activityController = require("../../../controllers/v1/activity.controller");

const router = express.Router();

router.get(
    "/get_liked_content",
    authMiddleware,
    activityController.getLikedContent
);

router.get(
    "/get_saved_content",
    authMiddleware,
    activityController.getSavedContent
);

router.get(
    "/get_recent_activity",
    authMiddleware,
    activityController.getRecentActivity
);

router.post(
    "/add_to_liked",
    authMiddleware,
    activityController.addToLikedContent
);

router.post(
    "/remove_from_liked",
    authMiddleware,
    activityController.removeFromLikedContent
);

router.post(
    "/add_to_saved",
    authMiddleware,
    activityController.addToSavedContent
);

router.post(
    "/remove_from_saved",
    authMiddleware,
    activityController.removeFromSavedContent
);

router.post(
    "/add_to_recents",
    authMiddleware,
    activityController.addToRecentActivity
);

module.exports = router;


