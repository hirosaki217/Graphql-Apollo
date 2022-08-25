const { gql } = require('apollo-server');

module.exports = gql`
    type Query {

    }
    input UserInput {
        firstName: String!
        lastName: String!
        email: String!
        password: String!
    }

    type Mutation {
    }

    type User {
        id: ID!
        firstName: String!
        lastName: String!
        email: String!
    }

`;
