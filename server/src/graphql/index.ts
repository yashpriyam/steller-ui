import * as Query from "./Query";
import * as Mutation from "./Mutation";
import { DateTimeResolver, JSONObjectResolver } from "graphql-scalars";

const resolvers = {
  Query,
  Mutation,
  DateTime: DateTimeResolver,
  JSON: JSONObjectResolver,
};

export default resolvers;
