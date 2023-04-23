const { Sequelize } = require("sequelize")

exports.mysqlConnect = uri => {
  return new Promise(resolve => {
    try {
      const connection = new Sequelize(uri, { dialectModule: require("mysql2") })

      connection
        .authenticate()
        .then(() => {
          console.log("Connected to MySQL.")
          resolve(connection)
        })
        .catch(error => {
          console.error("Unable to connect to the database: ", error)
        })
    } catch (error) {
      console.log("Initial error:", error.message)
      resolve(null)
    }
  })
}
