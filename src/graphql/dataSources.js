import { mysqlConnect } from "../util/mysql/"
import { createNoteModel } from "../modules/notes/models/noteModel"
import { createUserModel } from "../modules/user/models/userModel"
import TodoDataSource from "../modules/notes/datasources/TodoDatasource"
import UserDatasource from "../modules/user/datasources/UserDatasource"

export const buildDataSources = async config => {
  const { testMySQLUri } = config

  // You can connect mote databases in here like MongoDB, Oracle.
  const connectTasks = [mysqlConnect(testMySQLUri)]

  const [testMySQLConn] = await Promise.all(connectTasks)

  // You can add many datasources in here
  const todoDataSource = new TodoDataSource(createNoteModel(testMySQLConn))
  const userDataSource = new UserDatasource(createUserModel(testMySQLConn))

  return { todoDataSource, userDataSource }
}
