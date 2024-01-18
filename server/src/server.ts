import "module-alias/register";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import cors from "cors";
import resolvers from "./graphql";
import typeDefs from "./graphql/typeDefs";
import Connection from "./db/conn";
import express from "express";
import cookieParser from "cookie-parser";
import cloudinaryConfiguration from "./db/cloudinaryConf";
import pingServer from "./cron/pingServer";
import jwt from "jsonwebtoken";
const PORT = process.env.PORT || 8080;

(async () => {
  const app: express.Application = express();
  app.use(express.json({ limit: "50mb" }));

  // dotenv configuration
  dotenv.config();

  // cloudinary configuration
  cloudinaryConfiguration();

  // To ping server in every 10 mins
  pingServer.start();

  // connect to db
  Connection(process.env.MONGODB_URI);

  const corsOption = {
    origin: [
      "http://localhost:3001",
      "http://localhost:3000",
      "https://studio.apollographql.com",
      "https://webmaster-portal-git-deployment-yashpriyam.vercel.app",
      "https://webmaster-portal-git-dev-yashpriyam.vercel.app",
      "https://webmaster-portal-git-staging-yashpriyam.vercel.app",
      "https://webmaster-portal-yashpriyam.vercel.app",
      "https://webmaster-portal.vercel.app",
      "https://www.bewebmasters.com",
      "www.bewebmasters.com",
      "bewebmasters.com"
    ],
    credentials: true,
  };

  //   Setting up CORS
  app.use(cors(corsOption));
  app.use(cookieParser());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => {
      const token = req.cookies[process.env.JWT_SECRET_KEY || ""];
      let contextData;
      try {
        if (token) {
          contextData = jwt.verify(token, process.env.JWT_SECRET_VALUE || "");
        }
      } catch (err) {
        console.log({ err });
      }
      return { req, res, contextData };
    },
  });
  await server.start();
  await server.applyMiddleware({ app, path: "/graphql", cors: false });

  app.listen({ port: PORT }, () => {
    console.log(`Server is running on port number ${PORT}`);
  });
})();
