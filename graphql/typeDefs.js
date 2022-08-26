const { gql } = require('apollo-server');

module.exports = gql`
    type Query {
        getUsers: [User]
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

    type Mutation {
        signupUser(newUser: UserInput!): User
        signinUser(userSignin: UserSigninInput!): Token
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
`;
