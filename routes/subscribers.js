const express = require('express')
const router = express.Router()

// Import the model
const Subscriber = require('../models/subscriber')

// Getting all (GET)
router.get('/', async (req, res) => {
  try {
    // .find will return all the subscribers in the database
    const subscribers = await Subscriber.find()
    res.json(subscribers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One (GET id)
router.get('/:id', getSubscriber, (req, res) => {
  res.json(res.subscriber)
}) 

// // Creating one (POST)
router.post('/', async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel
  })
  try {
    const newSubscriber = await subscriber.save()
    // Status 201 is the code for "Created a new object"
    res.status(201).json(newSubscriber)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// // Updating One (PUT id)
// // We will use .patch instead of .put because we only want to update the fields that are passed in the request body, for example if they pass the name of the subscriber, we will only update the name of the subscriber.
router.patch('/:id', getSubscriber, async (req, res) => {
  if (req.body.name != null) {
    res.subscriber.name = req.body.name
  }
  if (req.body.subscribedToChannel != null) {
    res.subscriber.subscribedToChannel = req.body.subscribedToChannel
  }
  try {
    const updatedSubscriber = await res.subscriber.save()
    res.json(updatedSubscriber)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// // Deleting One (DELETE id)
router.delete('/:id', getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove()
    res.json({ message: 'Deleted Subscriber' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Middleware for getting a subscriber by id 
async function getSubscriber(req, res, next)  {
  let subscriber
  try {
    subscriber = await Subscriber.findById(req.params.id)
    if (subscriber == null) {
      return res.status(404).json({ message: 'Cannot find subscriber' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.subscriber = subscriber
  next()
}

// // Testing the routes
// router.get('/', (req, res) => {
//   res.send('Test')
// })


module.exports = router