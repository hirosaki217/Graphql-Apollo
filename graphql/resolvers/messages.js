const { PrismaClient } = require('@prisma/client');
const { AuthenticationError, ForbiddenError } = require('apollo-server-express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PubSub } = require('graphql-subscriptions');

const prisma = new PrismaClient();
const pubsub = new PubSub();

const MESSAGE_ADDED = 'MESSAGE_ADDED';

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
            pubsub.publish(MESSAGE_ADDED, { messageAdded: message });
            return message;
        },
    },
    Subscription: {
        messageAdded: {
            subcribe: () => pubsub.asyncIterator([MESSAGE_ADDED]),
        },
    },
};
