import mongoose from 'mongoose'
const { MONGO_DB_URI_TEST, MONGO_DB_URI, NODE_ENV } = process.env

const strinConnection = NODE_ENV === 'test' ? MONGO_DB_URI_TEST : MONGO_DB_URI
const { connect, connection } = mongoose

connect(strinConnection)
  .then(db => console.log('DB is connected a ' + db.connection.name))
  .catch(err => {
    console.log(err)
    connection.close()
    throw err
  })
