const { PrismaClient } = require('@prisma/client');
const { ApolloError, AuthenticationError } = require('apollo-server');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

module.exports = {
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
    },
};
