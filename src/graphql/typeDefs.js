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
    registerUser(input: RegisterInput): User
    loginUser(input: LoginInput): User
  }

  type ToDo {
    id: Int
    isCompleted: Boolean
    title: String
  }

  type Success {
    isSuccess: Boolean
  }

  type User {
    username: String
    email: String
    password: String
    token: String
  }

  input RegisterInput {
    username: String
    email: String
    password: String
  }

  input LoginInput {
    email: String
    password: String
  }
`
