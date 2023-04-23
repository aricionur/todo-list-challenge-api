const config = {}

export const loadConfig = () => {
  config.port = process.env.PORT || 4000
  config.testMySQLUri = process.env.TEST_MYSQL_URI || "mysql://username:password@localhost:3306/test"

  return config
}
