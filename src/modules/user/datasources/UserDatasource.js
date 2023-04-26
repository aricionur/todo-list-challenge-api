import { RESTDataSource } from "@apollo/datasource-rest"
import { GraphQLError } from "graphql"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

class UserDataSource extends RESTDataSource {
  constructor(model) {
    super()
    this.model = model
  }

  async registerUser({ input }) {
    const { username, email, password } = input

    const oldUser = await this.model.findOne({ where: { email } })
    if (oldUser) {
      throw new GraphQLError(`A user is already registered with the email:${email}.`, {
        extensions: { code: "USER_ALREADY_EXISTS" },
      })
    }

    const encryptedPassword = await bcryptjs.hash(password, 10)

    const newUser = await this.model.create({ username, email: email.toLowerCase(), password: encryptedPassword })

    const token = jwt.sign({ userID: newUser.id, email: newUser.email }, "THE_SECRET_KEY", { expiresIn: "2h" })

    await newUser.update({ token })

    return newUser
  }

  async loginUser({ input }) {
    const { email, password } = input

    const user = await this.model.findOne({ where: { email } })

    if (user && (await bcryptjs.compare(password, user.password))) {
      user.token = jwt.sign({ userID: user.id, email: user.email }, "THE_SECRET_KEY", { expiresIn: "2h" })

      user.save()

      return user
    } else {
      throw new GraphQLError(`Incorect password.`, { extensions: { code: "INCORRECT_PASSWORD" } })
    }
  }
}

export default UserDataSource
