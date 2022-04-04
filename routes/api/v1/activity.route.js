const express = require("express");

const authMiddleware = require("../../../middlewares/auth.middleware");

const activityController = require("../../../controllers/v1/activity.controller");

const router = express.Router();

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
    "/add_to_saved",
    authMiddleware,
    activityController.addToSavedContent
);

router.delete(
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
