const mongoose = require("mongoose")

exports.dbconnect = async() => {
    try {
      conn = await mongoose.connect(process.env.MONGODB_ATLAS , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      console.log(`connected to database ${conn.connection.host}`)
    }catch (error) {
       console.log(error.message)
       process.e
    }
}