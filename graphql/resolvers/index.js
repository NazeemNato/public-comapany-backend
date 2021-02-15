const user = require('./users')
const employee = require('./employee')
const test = require('./test')

module.exports = {
    Query: {
        ...user.Query,
        ...test.Query,
        ...employee.Query
    },
    Mutation: {
        ...user.Mutation,
        ...employee.Mutation
    }
}