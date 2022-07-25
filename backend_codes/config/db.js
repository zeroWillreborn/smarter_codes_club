import mongoose from 'mongoose';

const connectDB = async (DB_URI) => {
  try {
    const DB_OPTIONS = {
      dbName: "smart_coders_db"
    }
    await mongoose.connect(DB_URI, DB_OPTIONS)
    console.log('Connected Successfully...')   // verifying that db connected or not
  } catch (error) {
    console.log(error)
  }
}

export default connectDB