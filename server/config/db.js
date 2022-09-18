import mongoose from "mongoose";
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //   useFindAndModify: true,
    });
    console.log(`MongoDb Connected ${conn.connection.host} `.cyan.bold);
  } catch (error) {
    console.log(`error:, ${error.message}`.red.bold);
    process.exit();
  }
};

export default connectDb;
