import { checkAuth } from "../../util/authentication/checkAuth"

export const resolvers = {
  Query: {
    listTodos: async (_, args, { auth, datasources: { todoDataSource } }) => checkAuth(auth) && todoDataSource.listTodos(args),
  },

  Mutation: {
    createTodo: (_, args, { auth, datasources: { todoDataSource } }) => checkAuth(auth) && todoDataSource.saveTodo(args),
    markTodoCompleted: (_, args, { auth, datasources: { todoDataSource } }) => checkAuth(auth) && todoDataSource.markTodoCompleted(args),
    markTodoUncompleted: (_, args, { auth, datasources: { todoDataSource } }) => checkAuth(auth) && todoDataSource.markTodoUncompleted(args),
    deleteTodo: (_, args, { auth, datasources: { todoDataSource } }) => checkAuth(auth) && todoDataSource.deleteTodo(args),

    registerUser: async (_, args, { datasources: { userDataSource } }) => userDataSource.registerUser(args),
    loginUser: async (_, args, { datasources: { userDataSource } }) => userDataSource.loginUser(args),
  },
}
