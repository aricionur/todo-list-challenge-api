import { mysqlConnect } from "../util/mysql/"
import { createNoteModel } from "../modules/notes/models/noteModel"
import TodoDataSource from "../modules/notes/datasources/TodoDatasource"

export const buildDataSources = async config => {
  const { testMySQLUri } = config

  // You can connect mote databases in here like MongoDB, Oracle.
  const connectTasks = [mysqlConnect(testMySQLUri)]

  const [testMySQLConn] = await Promise.all(connectTasks)

  // You can add many datasources in here
  const todoDataSource = new TodoDataSource(createNoteModel(testMySQLConn))

  return { todoDataSource }
}
