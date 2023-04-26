import { DataTypes } from "sequelize"

import { createMysqlModel } from "../../../util/mysql"

const tableSchema = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  token: {
    type: DataTypes.STRING,
  },
}

const modelOptions = { freezeTableName: true }

export const createUserModel = conn => {
  const noteModel = createMysqlModel(conn, "users", tableSchema, modelOptions)

  return noteModel
}
