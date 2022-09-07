const { ApolloServer, gql } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } = require('apollo-server-core');
const { WebSocketServer } = require('ws');
const { createServer } = require('http');
const { useServer } = require('graphql-ws/lib/use/ws');
const jwt = require('jsonwebtoken');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const express = require('express');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

// create express and HTTP server
const app = express();
const httpServer = createServer(app);
// create websocket server
const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
});

// Save the returned server's info so we can shut down this server later
const schema = makeExecutableSchema({ typeDefs, resolvers });
const serverCleanup = useServer({ schema }, wsServer);

const context = ({ req }) => {
    const { authorization } = req.headers;
    const auth = authorization ? authorization.split('Bearer ')[1] : '';
    if (auth) {
        const { userId } = jwt.verify(auth, process.env.JWT_SECRET);
        return { userId };
    }
};

// create apollo server
const apolloServer = new ApolloServer({
    schema,
    context,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
        // Proper shutdown for the HTTP server.
        ApolloServerPluginDrainHttpServer({ httpServer }),

        // Proper shutdown for the WebSocket server.
        {
            async serverWillStart() {
                return {
                    async drainServer() {
                        await serverCleanup.dispose();
                    },
                };
            },
        },
        ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
});

const startApollo = async () => {
    try {
        await apolloServer.start();
        apolloServer.applyMiddleware({ app, path: '/graphql' });
    } catch (error) {
        console.log(error);
    }
};
// await apolloServer.start();

// apolloServer.applyMiddleware({ app, path: '/graphql' });
startApollo();
httpServer.listen(5000);

// const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     context: ({ req }) => {
//         const { authorization } = req.headers;
//         const auth = authorization ? authorization.split('Bearer ')[1] : '';
//         if (auth) {
//             const { userId } = jwt.verify(auth, process.env.JWT_SECRET);
//             return { userId };
//         }
//     },
// });

// server.listen({ port: 5000 }).then(({ url }) => {
//     console.log(`Server ready at ${url}`);
// });
