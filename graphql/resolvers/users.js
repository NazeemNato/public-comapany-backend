const User = require("../../models/User");
const { UserInputError } = require("apollo-server-express");
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken')

require('dotenv').config()
const resolver = {
  Query: {
    login: async (_, args) => {
      const { email, password } = args;
      let errors = {};
      try {
        if (email.trim() === "") errors.email = "Email must not be empty";
        if (password.trim() === "")
          errors.password = "Password must not be empty";
        if (Object.keys(errors).length > 0) {
          throw new UserInputError("Bad inputs", { errors });
        }

        const user = await User.findOne({ email });

        if (!user) {
          throw new UserInputError("User not found", { errors });
        }

        const checkpwd = await bcryptjs.compare(password, user.password);

        if (!checkpwd) {
          throw new UserInputError("Invalid password", { errors });
          }
          const token = jwt.sign({ email },process.env.JWT_SECERT,{
              expiresIn:'2d'
          });
        user.token = token
        return user;
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    register: async (_, args) => {
      const { name, email, password } = args;
      let errors = {};
      try {
        if (email.trim() === "") errors.email = "Email must not be empty";
        if (name.trim() === "") errors.name = "name must not be empty";
        if (password.trim() === "")
          errors.password = "Password must not be empty";
        if (Object.keys(errors).length > 0) {
          throw new UserInputError("Bad inputs", { errors });
        }
        var hashpassword = await bcryptjs.hash(password, 6);
        console.log(hashpassword)
        const newUser =  User({
          name,
          email,
          password: hashpassword
        });
          const save = await newUser.save();
          const token = jwt.sign({ email },process.env.JWT_SECERT,{
            expiresIn:'2d'
        });
        save.token = token
        return save;
      } catch (err) {
          console.log(err)
        throw err;
      }
    },
  },
};

module.exports = resolver;
