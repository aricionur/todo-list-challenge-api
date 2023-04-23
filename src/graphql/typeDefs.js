import gql from "graphql-tag"

export const typeDefs = gql`
  type Query {
    listTodos: [ToDo]
  }

  type Mutation {
    createTodo(title: String!): ToDo
    markTodoCompleted(id: Int!): ToDo
    markTodoUncompleted(id: Int!): ToDo
    deleteTodo(id: Int!): Success
  }

  type ToDo {
    id: Int
    isCompleted: Boolean
    title: String
  }

  type Success {
    isSuccess: Boolean
  }
`
