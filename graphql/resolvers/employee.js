const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");
const Employee = require("../../models/Employee");
const resolvers = {
  Query: {
    employees: async () => {
      const data = await Employee.find();
      return data.reverse();
    },
  },
  Mutation: {
    addEmployee: async (_, args, context) => {
      let errors = {};
      try {
        if (!context.email) {
          throw new AuthenticationError("Unauthenticated");
        }
        const createdBy = context.email["email"];
        const { fullName,picture, department, role, salary, joinedYear } = args;

        if (fullName.trim() === "") {
          errors.fullName = "Name must not be empty";
        }
        if (picture.trim() === "") {
          errors.picture = "Picture must not be empty";
        }
        if (department.trim() === "") {
          errors.department = "Department must not be empty";
        }
        if (role.trim() === "") {
          errors.role = "Role must not be empty";
        }
        if (Object.keys(errors).length > 0) {
          throw new UserInputError("Bad inputs", { errors });
        }
        const newEmployee = Employee({
          fullName,
          picture,
          department,
          role,
          salary,
          joinedYear,
          createdBy,
        });
        const data = await newEmployee.save();
        return data;
      } catch (err) {
        throw err;
      }
    },
    removeEmployee: async (_, args, context) => {
      let errors = {};
      try {
        if (!context.email) {
          throw new AuthenticationError("Unauthenticated");
        }
        const { id } = args;
        if (id.trim() === "") {
          errors.id = "Id must not be empty";
        }
        if (Object.keys(errors).length > 0) {
          throw new UserInputError("Bad inputs", { errors });
        }
        const message = await Employee.findOneAndDelete({ _id: id });
        if (!message) {
          errors.message = "Invalid User ID";
          throw new UserInputError("Bad inputs", { errors });
        }
        return { output: "Done" };
      } catch (err) {
        throw err;
      }
    },
  },
};

module.exports = resolvers;
