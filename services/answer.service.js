const answerRepo = require("../repositories/answer.repository");
const questionRepo = require("../repositories/question.repository");
const userRepo = require("../repositories/user.repository");

const getAnswersOfQuestion = async (questionId) => {
    try {
        const answers = await answerRepo.getAnswersOfQuestion(questionId);
        return {
            status: true,
            message: "Fetched all answers successfully",
            data: answers,
            errors: {},
        };
    } catch (error) {
        throw error;
    }
};

const addAnswer = async (userId, questionId, text) => {
    try {
        const user = await userRepo.findUserById(userId);
        const author = user.firstname + " " + user.lastname;
        const answered_date = new Date();
        const answer = await answerRepo.addAnswer(
            author,
            userId,
            questionId,
            answered_date,
            text
        );
        await questionRepo.addAnswerToQuestion(questionId, answer._id);
        return {
            status: true,
            message: "Added answer successfully",
            data: answer,
            errors: {},
        };
    } catch (error) {
        throw error;
    }
};

const editAnswer = async (text, answerId) => {
    try {
        const answer = await answerRepo.editAnswer(text, answerId);
        return {
            status: true,
            message: "Edited answer successfully",
            data: answer,
            errors: {},
        };
    } catch (error) {
        throw error;
    }
};

const deleteAnswer = async (questionId, answerId) => {
    try {
        const answer = await answerRepo.deleteAnswer(questionId, answerId);
        await questionRepo.removeAnswerToQuestion(questionId, answer._id);
        return {
            status: true,
            message: "Delete answer successfully",
            data: answer,
            errors: {},
        };
    } catch (error) {
        throw error;
    }
};

const addVoteToAnswer = async (answerId, userId) => {
    try {
        const answer = await answerRepo.addVoteToAnswer(answerId, userId);
        return {
            status: true,
            message: "Up voted answer successfully",
            data: answer,
            errors: {},
        };
    } catch (error) {
        throw error;
    }
};

const removeVoteToAnswer = async (answerId, userId) => {
    try {
        const answer = await answerRepo.removeVoteToAnswer(answerId, userId);
        return {
            status: true,
            message: "Down voted answer successfully",
            data: answer,
            errors: {},
        };
    } catch (error) {
        throw error;
    }
};

const markAnswerAsCorrect = async (answerId) => {
    try {
        const answer = await answerRepo.markAnswerAsCorrect(answerId);
        return {
            status: true,
            message: "Marked answer as correct",
            data: answer,
            errors: {},
        };
    } catch (error) {
        throw error;
    }
};

const markAnswerAsWrong = async (answerId) => {
    try {
        const answer = await answerRepo.markAnswerAsWrong(answerId);
        return {
            status: true,
            message: "Marked answer as wrong",
            data: answer,
            errors: {},
        };
    } catch (error) {
        throw error;
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
