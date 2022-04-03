const Question = require("../models/question.model");
const User = require("../models/users.model");

const addQuestion = async (
    userId,
    author,
    published_date,
    title,
    summary,
    genre,
    screenshot
) => {
    const questionObject = new Question({
        userId,
        author,
        published_date,
        title,
        summary,
        genre,
        screenshot,
    });
    return await questionObject.save();
};

const updateQuestion = async (
    questionId,
    title,
    summary,
    genre,
    screenshot
) => {
    return await Question.updateOne(
        { _id: questionId },
        {
            $set: {
                title,
                summary,
                genre,
                screenshot,
            },
        }
    );
};

const deleteQuestion = async (questionId, userId) => {
    await Question.updateOne(
        { _id: questionId },
        {
            $set: {
                is_active: false,
            },
        }
    );
    return await User.updateOne(
        { _id: userId },
        {
            $pull: {
                questions: questionId,
            },
        }
    );
};

const upVoteAQuestion = async (questionId, userId) => {
    return await Question.updateOne(
        { _id: questionId },
        {
            $addToSet: {
                up_votes: userId,
            },
        }
    );
};

const downVoteAQuestion = async (questionId, userId) => {
    return await Question.updateOne(
        { _id: questionId },
        {
            $pull: {
                up_votes: userId,
            },
        }
    );
};

const findAllQuestions = async () => {
    return await Question.find();
};

const findQuestionByQuestionId = async (questionId) => {
    return await Question.findOne({ _id: questionId });
};

const findQuestionsByUserId = async (userId) => {
    return await Question.find({ userId });
};

const addAnswerToQuestion = async (questionId, answerId) => {
    return await Question.updateOne(
        { _id: questionId },
        {
            $addToSet: {
                answers: answerId,
            },
        }
    );
};
const removeAnswerToQuestion = async (questionId, answerId) => {
    return await Question.updateOne(
        { _id: questionId },
        {
            $pull: {
                answers: answerId,
            },
        }
    );
};

module.exports = {
    addQuestion,
    updateQuestion,
    deleteQuestion,
    findAllQuestions,
    findQuestionByQuestionId,
    findQuestionsByUserId,
    upVoteAQuestion,
    downVoteAQuestion,
    addAnswerToQuestion,
    removeAnswerToQuestion,
};
