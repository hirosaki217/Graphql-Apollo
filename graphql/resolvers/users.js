const { PrismaClient } = require('@prisma/client');
const { AuthenticationError, ForbiddenError } = require('apollo-server-express');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

module.exports = {
    Query: {
        getUsers: async (_, args, { userId }) => {
            if (!userId) throw new ForbiddenError('You must be loggin');
            const users = prisma.user.findMany({
                orderBy: {
                    createdAt: 'desc',
                },
                where: {
                    id: {
                        not: userId,
                    },
                },
            });
            return users;
        },
    },
    Mutation: {
        signupUser: async (_, { newUser }) => {
            const testUser = await prisma.user.findUnique({ where: { email: newUser.email } });
            if (testUser) throw new AuthenticationError('User already exists with that email');
            const password = await bcrypt.hash(newUser.password, 12);
            const user = await prisma.user.create({
                data: {
                    ...newUser,
                    password,
                },
            });
            console.log(user);
            return user;
        },
        signinUser: async (_, { userSignin }) => {
            const testUser = await prisma.user.findUnique({ where: { email: userSignin.email } });
            if (!testUser) throw new AuthenticationError("user doesn't exists with that email ");
            const match = await bcrypt.compare(userSignin.password, testUser.password);
            if (!match) throw new AuthenticationError('email or password is invalid');
            const token = jwt.sign(
                {
                    userId: testUser.id,
                    email: testUser.email,
                },
                process.env.JWT_SECRET,
                { expiresIn: '1h' },
            );
            return { token };
        },
    },
};
