const { AuthenticationError } = require("apollo-server-express");
const resolvers = {
  Query: {
    hello: async (_, __, context) => {
          try {
              console.log(context.email)
        if (!context.email) {
          throw new AuthenticationError("Unauthenticated");
        }
        return "Hello World";
      } catch (err) {
        throw err;
      }
    },
  },
};

module.exports = resolvers;
