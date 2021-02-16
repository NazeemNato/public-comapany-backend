const { gql } = require("apollo-server-express");

const typeDefs = gql`

  type Employee {
    id: ID
    picture: String!
    fullName: String!
    department: String!
    role: String!
    salary: Float
    joinedYear: Int
  }
  type Message{
    output: String
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
    hello: String
  }
  type Mutation {
    register(name: String!, email: String!, password: String!): User!
    addEmployee(
      fullName: String!
      picture: String!
      department: String!
      role: String
      salary: Float
      joinedYear: Int
    ): Employee!
    removeEmployee(id:String!): Message!
  }
`;

module.exports = typeDefs;
