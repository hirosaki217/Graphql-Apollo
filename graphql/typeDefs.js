const { gql } = require('apollo-server');

module.exports = gql`
    type Query {
        getUser(username: String!): User
    }
    input UserInput {
        firstName: String!
        lastName: String!
        email: String!
        password: String!
    }

    type Mutation {
        signupUser(newUser: UserInput): User
    }

    type User {
        id: ID!
        firstName: String!
        lastName: String!
        email: String!
    }
`;
