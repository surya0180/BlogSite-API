const questionService = require("../../services/question.service");

const createQuestion = async (req, res) => {
    try {
        const body = req.body;
        if (
            body.userId !== undefined &&
            body.title !== undefined &&
            body.summary !== undefined &&
            body.genre !== undefined
        ) {
            const response = await questionService.createQuestion(
                body.userId,
                body.title,
                body.summary,
                body.genre,
                body.screenshot
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
            message: "Internal server error",
            data: {},
            errors: error.message,
        });
    }
};

const updateQuestion = async (req, res) => {
    try {
        const body = req.body;
        if (
            body.questionId !== undefined &&
            body.title !== undefined &&
            body.summary !== undefined &&
            body.genre !== undefined
        ) {
            const response = await questionService.updateQuestion(
                body.questionId,
                body.title,
                body.summary,
                body.genre,
                body.screenshot
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
            message: "Internal server error",
            data: {},
            errors: error.message,
        });
    }
};

const deleteQuestion = async (req, res) => {
    try {
        const body = req.body;
        if (body.questionId !== undefined && body.userId) {
            const response = await questionService.deleteQuestion(
                body.questionId,
                body.userId
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
            message: "Internal server error",
            data: {},
            errors: error.message,
        });
    }
};

const getQuestions = async (req, res) => {
    try {
        const response = await questionService.getQuestions();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            data: {},
            errors: error.message,
        });
    }
};

const getQuestionsByUserId = async (req, res) => {
    try {
        const body = req.body;
        if (body.userId !== undefined) {
            const response = await questionService.getQuestionsByUserId(
                body.userId
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

const getQuestionByQuestionId = async (req, res) => {
    try {
        const questionId = req.params.questionId;
        if (questionId !== undefined) {
            const response = await questionService.getQuestionByQuestionId(
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

module.exports = {
    createQuestion,
    updateQuestion,
    deleteQuestion,
    getQuestions,
    getQuestionsByUserId,
    getQuestionByQuestionId,
};
