import { connect } from 'mongoose';
import 'dotenv/config'

const connectDB = async () => {
    try {
        const conn = await connect(process.env.MONGO_URL)
        console.log(`Connection established: ${conn.connection.name}`)
    } catch (error) {
        console.log('MongoDb connection error', error)
        process.exit(1)
    }
}
export default connectDB