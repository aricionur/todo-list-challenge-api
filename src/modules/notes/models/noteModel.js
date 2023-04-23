import { DataTypes } from "sequelize"

import { createMysqlModel } from "../../../util/mysql"

const tableSchema = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
  },

  updatedAt: {
    type: DataTypes.DATE,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
}

const modelOptions = { freezeTableName: true }

export const createNoteModel = conn => {
  const noteModel = createMysqlModel(conn, "todos", tableSchema, modelOptions)

  return noteModel
}
