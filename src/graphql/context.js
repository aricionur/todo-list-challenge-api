import { buildDataSources } from "./dataSources"

// the function that sets up the global context for each resolver, using the req
export const getContext = async config => {
  const datasources = await buildDataSources(config)

  return () => ({ datasources })
}
