import { authMiddleware } from "../../util/authentication/checkAuth"

export const resolvers = {
  Query: {
    listTodos: authMiddleware(async (_, args, { user, datasources: { todoDataSource } }) => todoDataSource.listTodos(args, user)),
  },

  Mutation: {
    createTodo: authMiddleware((_, args, { user, datasources: { todoDataSource } }) => todoDataSource.saveTodo(args, user)),
    markTodoCompleted: authMiddleware((_, args, { datasources: { todoDataSource } }) => todoDataSource.markTodoCompleted(args)),
    markTodoUncompleted: authMiddleware((_, args, { datasources: { todoDataSource } }) => todoDataSource.markTodoUncompleted(args)),
    deleteTodo: authMiddleware((_, args, { datasources: { todoDataSource } }) => todoDataSource.deleteTodo(args)),

    registerUser: async (_, args, { datasources: { userDataSource } }) => userDataSource.registerUser(args),
    loginUser: async (_, args, { datasources: { userDataSource } }) => userDataSource.loginUser(args),
  },
}
