const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://user1:teste1@cluster0.jhtw8.mongodb.net/users?retryWrites=true&w=majority'

const openConnection = () => mongoose.connect(connectionString, { useNewUrlParser: true })

module.exports = {
    openConnection,
}