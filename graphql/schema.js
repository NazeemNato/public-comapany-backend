const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Employee {
    fullName: String!
    department: String!
    role: String
    salary: Float
    joinedYear: Int
  }
  type User {
      name: String
      email: String
      token: String
      password: String
  }
  type Query {
    employees: [Employee]!
    login(email: String!, password: String!): User!
  }
  type Mutation {
    register(name: String!, email: String!, password: String!): User!
    addEmployee(
      fullName: String!
      department: String!
      role: String
      salary: Float
      joinedYear: Int
    ): Employee!
  }
`;

module.exports = typeDefs;
