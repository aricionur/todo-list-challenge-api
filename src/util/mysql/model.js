exports.createMysqlModel = (conn, tableName, tableSchema, options = {}) => {
  if (!conn) return null

  const model = conn.define(tableName, tableSchema, options)

  model
    .sync()
    .then(() => {
      console.log(`${tableName} table created successfully!`)
    })
    .catch(error => {
      console.error(`Unable to create ${tableName} table: `, error)
    })

  return model
}
