import { RESTDataSource } from "@apollo/datasource-rest"
import { ApolloServerErrorCode } from "@apollo/server/errors"
import { GraphQLError } from "graphql"

class TodoDataSource extends RESTDataSource {
  constructor(model) {
    super()
    this.model = model
  }

  async saveTodo(args, user) {
    const { id } = args
    const today = new Date()
    args.updatedAt = today

    if (id) {
      const [updatedData] = await this.model.upsert(args)
      return updatedData
    } else {
      const { userID } = user

      if (userID) args.userID = userID
      args.createdAt = today

      return this.model.create(args)
    }
  }

  markTodoCompleted(args) {
    args.isCompleted = true

    return this.saveTodo(args)
  }

  markTodoUncompleted(args) {
    args.isCompleted = false

    return this.saveTodo(args)
  }

  async deleteTodo({ id }) {
    const deletedCount = await this.model.destroy({ where: { id } })

    if (deletedCount === 0)
      return new GraphQLError(`Given id:${id}  does not exist in database.`, {
        extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
      })

    return { isSuccess: true }
  }

  listTodos(args, user) {
    if (user.userID) args.userID = user.userID

    if (args.id) return this.model.findOne(args)
    return this.model.findAll({ where: args })
  }
}

export default TodoDataSource
