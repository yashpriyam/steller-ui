import 'module-alias/register';
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import cors from "cors";
import resolvers from "./graphql";
import typeDefs from "./graphql/typeDefs";
import Connection from "./db/conn";
import express from "express";
const PORT = process.env.PORT || 8080;

(async () => {
  const app = express() as any;

  // dotenv configuration
  dotenv.config();

  // connect to db
  Connection(process.env.MONGODB_URI);

  const corsOption = {
    origin: [
      "http://localhost:3001",
      "http://localhost:3000",
      "https://studio.apollographql.com",
    ],
    credentials: true,
  };

  //   Setting up CORS
  app.use(cors(corsOption));

  const server = new ApolloServer({ typeDefs, resolvers, context: ({ req, res }) => ({ req, res }) });
  await server.start();
  await server.applyMiddleware({ app, path: "/graphql", cors: false });

  app.listen({ port: PORT }, () => {
    console.log(`Server is running on port number ${PORT}`);
  });
})();
