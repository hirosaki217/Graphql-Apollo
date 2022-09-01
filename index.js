const { ApolloServer, gql } = require('apollo-server');
const typeDefs = require('./graphql/typeDefs');
const jwt = require('jsonwebtoken');

const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const { authorization } = req.headers;
        const auth = authorization.split('Bearer ')[1];
        if (auth) {
            const { userId } = jwt.verify(auth, process.env.JWT_SECRET);
            return { userId };
        }
    },
});

server.listen({ port: 5000 }).then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
