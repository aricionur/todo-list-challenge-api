export const resolvers = {
  Query: {
    listTodos: async (_, args, { datasources: { todoDataSource } }) => todoDataSource.listTodos(args),
  },

  Mutation: {
    createTodo: (_, args, { datasources: { todoDataSource } }) => todoDataSource.saveTodo(args),
    markTodoCompleted: (_, args, { datasources: { todoDataSource } }) => todoDataSource.markTodoCompleted(args),
    markTodoUncompleted: (_, args, { datasources: { todoDataSource } }) => todoDataSource.markTodoUncompleted(args),
    deleteTodo: (_, args, { datasources: { todoDataSource } }) => todoDataSource.deleteTodo(args),
  },
}
