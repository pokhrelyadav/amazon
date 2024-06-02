import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://mongodbyadav123:mongodbyadav123@pokhrelcluster.sooa4rs.mongodb.net/amazon?retryWrites=true&w=majority&appName=pokhrelcluster"
    );
    console.log("DB connection successful");
  } catch (error) {
    console.log("DB connection failed");
    console.log(error.message);
  }
};

export default connectDB;

// import mongoose from "mongoose";
// const connectDB = async () => {
//   await mongoose
//     .connect(
//       "mongodb+srv://mongodbyadav123:mongodbyadav123@pokhrelcluster.sooa4rs.mongodb.net/amazon?retryWrites=true&w=majority&appName=pokhrelcluster"
//     )
//     .then(() => {
//       console.log("db connect successful");
//     })
//     .catch((error) => {
//       console.log(unsuccessful)
//       console.log(error.message);
//     });
// };

// export default connectDB;
