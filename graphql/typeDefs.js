const { gql } = require('apollo-server-express');

module.exports = gql`
    type Query {
        getUsers: [User]
        messagesByUser(receiverId: Int!): [Message]
    }
    input UserInput {
        firstName: String!
        lastName: String!
        email: String!
        password: String!
    }

    input UserSigninInput {
        email: String!
        password: String!
    }

    type Message {
        id: ID!
        text: String!
        receiverId: Int!
        senderId: Int!
        createdAt: String
    }

    type Mutation {
        signupUser(newUser: UserInput!): User
        signinUser(userSignin: UserSigninInput!): Token
        createMessage(receiverId: Int!, text: String): Message
    }

    type Token {
        token: String!
    }

    type User {
        id: ID!
        firstName: String!
        lastName: String!
        email: String!
    }

    type Subscription {
        messageAdded: Message
    }
`;
