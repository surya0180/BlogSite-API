const answerService = require("../../services/answer.service");

const getAnswersOfQuestion = async (req, res) => {
    try {
        const questionId = req.params.questionId;
        if (questionId !== undefined) {
            const response = await answerService.getAnswersOfQuestion(
                questionId
            );
            return res.status(200).json(response);
        } else {
            return res.status(422).json({
                status: false,
                message: "Missing parameters",
                data: {},
                errors: {},
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal Server error",
            data: {},
            errors: {},
        });
    }
};

const addAnswer = async (req, res) => {
    try {
        const body = req.body;
        if (
            body.questionId !== undefined &&
            req.user.id !== undefined &&
            body.text !== undefined
        ) {
            const response = await answerService.addAnswer(
                req.user.id,
                body.questionId,
                body.text
            );
            return res.status(200).json(response);
        } else {
            return res.status(422).json({
                status: false,
                message: "Missing parameteres",
                data: {},
                errors: {},
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal Server error",
            data: {},
            errors: {},
        });
    }
};

const editAnswer = async (req, res) => {
    try {
        const body = req.body;
        if (body.text !== undefined && body.answerId !== undefined) {
            const response = await answerService.editAnswer(
                body.text,
                body.answerId
            );
            return res.status(200).json(response);
        } else {
            return res.status(422).json({
                status: false,
                message: "Missing parameters",
                data: {},
                errors: {},
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal Server error",
            data: {},
            errors: {},
        });
    }
};

const deleteAnswer = async (req, res) => {
    try {
        const body = req.body;
        if (body.answerId !== undefined && body.questionId !== undefined) {
            const response = await answerService.deleteAnswer(
                body.questionId,
                body.answerId
            );
            return res.status(200).json(response);
        } else {
            return res.status(422).json({
                status: false,
                message: "Missing parameters",
                data: {},
                errors: {},
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal Server error",
            data: {},
            errors: {},
        });
    }
};

const addVoteToAnswer = async (req, res) => {
    try {
        const body = req.body;
        if (req.user.id !== undefined && body.answerId !== undefined) {
            const response = await answerService.addVoteToAnswer(
                body.answerId,
                req.user.id
            );
            return res.status(200).json(response);
        } else {
            return res.status(422).json({
                status: false,
                message: "Missing parameters",
                data: {},
                errors: {},
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal Server error",
            data: {},
            errors: {},
        });
    }
};

const removeVoteToAnswer = async (req, res) => {
    try {
        const body = req.body;
        if (req.user.id !== undefined && body.answerId !== undefined) {
            const response = await answerService.removeVoteToAnswer(
                body.answerId,
                req.user.id
            );
            return res.status(200).json(response);
        } else {
            return res.status(422).json({
                status: false,
                message: "Missing parameters",
                data: {},
                errors: {},
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal Server error",
            data: {},
            errors: {},
        });
    }
};

const markAnswerAsCorrect = async (req, res) => {
    try {
        const body = req.body;
        if (body.answerId !== undefined) {
            const response = await answerService.markAnswerAsCorrect(
                body.answerId
            );
            return res.status(200).json(response);
        } else {
            return res.status(422).json({
                status: false,
                message: "Missing parameters",
                data: {},
                errors: {},
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal Server error",
            data: {},
            errors: {},
        });
    }
};

const markAnswerAsWrong = async (req, res) => {
    try {
        const body = req.body;
        if (body.answerId !== undefined) {
            const response = await answerService.markAnswerAsWrong(
                body.answerId
            );
            return res.status(200).json(response);
        } else {
            return res.status(422).json({
                status: false,
                message: "Missing parameters",
                data: {},
                errors: {},
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal Server error",
            data: {},
            errors: {},
        });
    }
};

module.exports = {
    getAnswersOfQuestion,
    addAnswer,
    editAnswer,
    deleteAnswer,
    addVoteToAnswer,
    removeVoteToAnswer,
    markAnswerAsCorrect,
    markAnswerAsWrong,
};
