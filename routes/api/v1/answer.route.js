const express = require("express");

const authMiddleware = require("../../../middlewares/auth.middleware");

const answerController = require("../../../controllers/v1/answer.controller");

const router = express.Router();

router.get("/get_answers/:questionId", answerController.getAnswersOfQuestion);
router.post("/add_answer", authMiddleware, answerController.addAnswer);
router.post("/edit_answer", authMiddleware, answerController.editAnswer);
router.delete("/delete_answer", authMiddleware, answerController.deleteAnswer);
router.post(
    "/up_vote_answer",
    authMiddleware,
    answerController.addVoteToAnswer
);
router.post(
    "/down_vote_answer",
    authMiddleware,
    answerController.removeVoteToAnswer
);
router.post(
    "/mark_as_correct",
    authMiddleware,
    answerController.markAnswerAsCorrect
);
router.post(
    "/mark_as_wrong",
    authMiddleware,
    answerController.markAnswerAsWrong
);

module.exports = router;
