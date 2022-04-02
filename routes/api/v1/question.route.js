const express = require("express");

const router = express.Router();

const authMiddleware = require("../../../middlewares/auth.middleware");

const questionController = require("../../../controllers/v1/question.controller");

router.get("/get_all_questions", questionController.getQuestions);

router.get(
    "/get_questions",
    authMiddleware,
    questionController.getQuestionsByUserId
);

router.get(
    "/get_question/:questionId",
    questionController.getQuestionByQuestionId
);

router.post(
    "/create_question",
    authMiddleware,
    questionController.createQuestion
);

router.post(
    "/update_question",
    authMiddleware,
    questionController.updateQuestion
);

router.post(
    "/delete_question",
    authMiddleware,
    questionController.deleteQuestion
);

router.post(
    "/up_vote_question",
    authMiddleware,
    questionController.upVoteAQuestion
);

router.post(
    "/down_vote_question",
    authMiddleware,
    questionController.downVoteAQuestion
);

module.exports = router;
