const user = require('./users')


module.exports = {
    Query: {
        ...user.Query
    },
    Mutation: {
        ...user.Mutation
    }
}