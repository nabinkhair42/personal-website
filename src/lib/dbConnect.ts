import mongoose from "mongoose";
 
const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI!);

    const host = connection.connection.host;
    console.log(`Connected to MongoDB at host: ${host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDatabase;