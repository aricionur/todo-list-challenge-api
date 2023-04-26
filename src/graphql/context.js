import { buildDataSources } from "./dataSources"
import { GraphQLError } from "graphql"

// the function that sets up the global context for each resolver, using the req
export const getContext = async config => {
  const datasources = await buildDataSources(config)

  return async ({ req, res }) => {
    const auth = { authHeader: req.headers?.authorization }

    return { auth, datasources }
  }
}
