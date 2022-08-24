const { ApolloServer, gql } = require('apollo-server');
const crypto = require('crypto');

const users = [
    {
        id: 1,
        firstName: 'mukesh',
        lastName: 'kumar',
        email: 'mukesh@mukeshkumar.com',
        password: '12345',
    },
    {
        id: 2,
        firstName: 'suresh',
        lastName: 'sharma',
        email: 'suresh@sureshkumar.com',
        password: '12346',
    },
];

const typeDefs = gql`
    type Query {
        getUsers: [User]!
        getUser(id: ID!): User
    }
    input UserInput {
        firstName: String!
        lastName: String!
        email: String!
        password: String!
    }

    type Mutation {
        createUser(newUser: UserInput!): User
    }

    type User {
        id: ID!
        firstName: String!
        lastName: String!
        email: String!
    }
`;

const resolvers = {
    Query: {
        getUsers: () => users,
        getUser: (_, { id }) => {
            return users.find((user) => user.id == id);
        },
    },
    Mutation: {
        createUser(_, { newUser }) {
            const user = {
                id: crypto.randomUUID(),
                ...newUser,
            };
            users.push(user);
            return user;
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 5000 }).then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
