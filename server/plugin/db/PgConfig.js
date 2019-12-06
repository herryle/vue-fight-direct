module.exports = app => {
  const pgOpt = require('pg')
  const pgConfig = {
    user: 'postgres',
    database: 'xcgis',
    password: 'dwigis',
    host: '47.105.220.147',
    port: '5432',
    poolSize: 5,
    poolIdleTimeout: 30000,
    reapIntervalMillis: 10000
  }
  const pgPool = new pgOpt.Pool(pgConfig)

  pgPool.connect(function(isErr, client, done) {
    if (isErr) {
      console.log('connect query:' + isErr.message)
      return
    }
    client.query(
      'SELECT "username", "Column 2" FROM "sde"."test" ;',
      [],
      function(isErr, rst) {
        done()
        if (isErr) {
          console.log('query error:' + isErr.message)
        } else {
          console.log('query success, data is: ' + rst.rows)
        }
      }
    )
  })
}
