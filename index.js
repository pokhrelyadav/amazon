import express from "express";
import connectDB from "./db.connect.js";
import product from "./product/product.model.js";
import mongoose from "mongoose";

const app = express();

// to make app understand json
app.use(express.json());

// connect db
connectDB();

//  create routes here
app.post("/product/add", async (req, res) => {
  // extract new product from req.body
  const newProduct = req.body;

  await product.create(newProduct);

  return res.status(201).send({ message: "product is added successfully." });
});

// get products
app.get("/product/list", async (req, res) => {
  const products = await product.find();

  return res.status(200).send({ message: "success", productList: products });
});


// Delete product
app.delete("/product/delete/:productId", async (req, res) => {
  // extract product id from req.params
  const productId = req.params.productId;

  // check if product id is valid mongo id
  const isValidMongoId = mongoose.isValidObjectId(productId);

  // if not valid mongo id, throw error
  if (!isValidMongoId) {
    return res.status(400).send({ message: "Invalid mongo id." });
  }

  // find product using product id
  const requiredproduct = await product.findOne({ _id: productId });

  // if  not product, throw error
  if (!requiredproduct) {
    return res.status(404).send({ message: "product does not exist." });
  }

  // delete product
  await product.deleteOne({ _id: productId });

  // send res
  return res.status(200).send({ message: "product is deleted successfully." });
});


// Edit
app.put("/product/edit/:productId", async (req, res) => {
  // extract productId from req.params
  const productId = req.params.productId;

  // check for mongo id validity
  const isValidMongoId = mongoose.isValidObjectId(productId);

  // if not valid mongo id, throw error
  if (!isValidMongoId) {
    return res.status(400).send({ message: "Invalid mongo id." });
  }

  // find product
  const requiredproduct = await product.findOne({ _id: productId });

  // if not product, throw error
  if (!requiredproduct) {
    return res.status(404).send({ message: "product does not exist." });
  }

  // extract new values from req.body
  const newValues = req.body;

  // update product
  await product.updateOne(
    { _id: productId },
    {
      $set: {
        name: newValues.name,
        duration: newValues.duration,
        price: newValues.price,
        tutorName: newValues.tutorName,
      },
    }
  );

  // send response
  return res.status(200).send({ message: "product is updated successfully." });
});

// network port and server
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
