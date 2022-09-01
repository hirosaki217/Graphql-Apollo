const { PrismaClient } = require('@prisma/client');
const { AuthenticationError, ForbiddenError } = require('apollo-server');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
module.exports = {
    Query: {
        messagesByUser: async (_, { receiverId }, { userId }) => {
            if (!userId) throw new ForbiddenError('You must be logged in');
            const messages = await prisma.message.findMany({
                where: {
                    OR: [
                        { senderId: userId, receiverId: receiverId },
                        { senderId: receiverId, receiverId: userId },
                    ],
                },
            });
            return messages;
        },
    },
    Mutation: {
        createMessage: async (_, { receiverId, text }, { userId }) => {
            const message = await prisma.message.create({
                data: {
                    text: text,
                    receiverId: receiverId,
                    senderId: userId,
                },
            });
            return message;
        },
    },
};
