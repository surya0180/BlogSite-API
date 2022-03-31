const questionsRepo = require("../repositories/question.repository");
const userRepo = require("../repositories/user.repository");

const createQuestion = async (userId, title, summary, genre, screenshot) => {
    try {
        const user = await userRepo.findUserById(userId);
        const author = user.firstname + " " + user.lastname;
        const published_date = new Date();

        const questions = await questionsRepo.addQuestion(
            userId,
            author,
            published_date,
            title,
            summary,
            genre,
            screenshot
        );
        await userRepo.addQuestionIdToUser(userId, questions._id);
        return {
            status: true,
            message: "Question created successfully",
            data: questions,
            errors: {},
        };
    } catch (error) {
        throw error;
    }
};

const updateQuestion = async (
    questionsId,
    title,
    summary,
    genre,
    screenshot
) => {
    try {
        const response = await questionsRepo.updateQuestion(
            questionsId,
            title,
            summary,
            genre,
            screenshot
        );
        if (response) {
            return {
                status: true,
                message: "Question updated successfully",
                data: response,
                errors: {},
            };
        }
    } catch (error) {
        throw error;
    }
};

const deleteQuestion = async (questionsId, userId) => {
    try {
        const response = await questionsRepo.deleteQuestion(
            questionsId,
            userId
        );
        await userRepo.deleteQuestionIdFromUser(userId, questionsId);
        return {
            status: true,
            message: "Question deleted successfully",
            data: response,
            errors: {},
        };
    } catch (error) {
        throw error;
    }
};

const getQuestions = async () => {
    try {
        const questions = await questionsRepo.findAllQuestions();
        return {
            status: true,
            message: "Fetched all questions successfully",
            data: questions,
            errors: {},
        };
    } catch (error) {
        throw error;
    }
};

const getQuestionsByUserId = async (userId) => {
    try {
        const questions = await questionsRepo.findQuestionsByUserId(userId);
        return {
            status: true,
            message: "Fetched all questions of this user successfully",
            data: questions,
            errors: {},
        };
    } catch (error) {
        throw error;
    }
};

const getQuestionByQuestionId = async (questionsId) => {
    try {
        const questions = await questionsRepo.findQuestionByQuestionId(
            questionsId
        );
        return {
            status: true,
            message: "Fetched the questions with its id successfully",
            data: questions,
            errors: {},
        };
    } catch (error) {
        throw error;
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
