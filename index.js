const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        greet: String
    }
`;

const resolvers = {
    Query: {
        greet: () => 'Hello world',
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 5000 }).then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
