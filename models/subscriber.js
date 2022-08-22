const mongoose = require('mongoose')

const subscriberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  subscribedToChannel: {
    type: String,
    required: true
  },
  subscribeDate: {
    type: Date,
    required: true,
    default: Date.now
  }
})

// The .model function takes two properties: the name of the model and the schema that defines the structure of the model.
module.exports = mongoose.model('Subscriber', subscriberSchema)