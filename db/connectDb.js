import mongoose from "mongoose";

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(`mongodb+srv://cs7804:cs7804@cluster0.aqk4ehm.mongodb.net/PopCorn?retryWrites=true&w=majority&appName=Cluster0`, {
        useNewUrlParser: true,
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }

  export default connectDB;