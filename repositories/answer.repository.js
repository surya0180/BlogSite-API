const Answer = require("../models/answer.model");

const getAnswersOfQuestion = async (questionId) => {
    return await Answer.find({ questionId });
};

const addAnswer = async (author, userId, questionId, answered_date, text) => {
    const answer = new Answer({
        author,
        userId,
        questionId,
        answered_date,
        text,
    });
    return await answer.save();
};

const editAnswer = async (text, answerId) => {
    return await Answer.updateOne(
        { _id: answerId },
        {
            $set: {
                text,
            },
        }
    );
};

const deleteAnswer = async (questionId, answerId) => {
    return await Answer.updateOne(
        { _id: answerId, questionId },
        {
            $set: {
                is_active: false,
            },
        }
    );
};

const addVoteToAnswer = async (answerId, userId) => {
    return await Answer.updateOne(
        { _id: answerId },
        {
            $addToSet: {
                votes: userId,
            },
        }
    );
};

const removeVoteToAnswer = async (answerId, userId) => {
    return await Answer.updateOne(
        { _id: answerId },
        {
            $pull: {
                votes: userId,
            },
        }
    );
};

const markAnswerAsCorrect = async (answerId) => {
    return await Answer.updateOne(
        { _id: answerId },
        {
            $set: {
                status: true,
            },
        }
    );
};

const markAnswerAsWrong = async (answerId) => {
    return await Answer.updateOne(
        { _id: answerId },
        {
            $set: {
                status: false,
            },
        }
    );
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
