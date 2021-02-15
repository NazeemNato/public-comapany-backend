const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const mongoose = require('mongoose')

const typeDefs = require('./graphql/schema')
const resolvers = require('./graphql/resolvers')

require("dotenv").config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8000;

const server = new ApolloServer({
    typeDefs,
    resolvers,
});
  
app.get("/", (_, res) => {
  res.send(`Hello World 👋 from ${process.env.AUTHOR}`);
});

server.applyMiddleware({ app });
mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
}, () => {
    console.log('Database connected 😇')
})

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`🚀 Graphql Server running at http://localhost:${PORT}${server.graphqlPath}`);
});
