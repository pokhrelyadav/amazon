import mongoose from "mongoose";

// set rule/schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  brand: String,
  description: String
});

// create table/model/collection
const product = mongoose.model("product", productSchema);

export default product;
