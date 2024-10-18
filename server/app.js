require("dotenv").config();
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pg6th.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

const PORT = 4000;

const app = express();
app.use(cors());

mongoose.connect(uri, clientOptions);
mongoose.connection.once("open", () => {
  console.log("Connected to database");
});

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
