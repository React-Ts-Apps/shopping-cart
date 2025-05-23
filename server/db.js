const mongoose = require('mongoose')
require('dotenv').config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`Connection established: ${conn.connection.name}`)
    } catch (error) {
        console.log('MongoDb connection error', error)
        process.exit(1)
    }
}
module.exports = connectDB