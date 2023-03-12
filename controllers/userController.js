const { User, Thought } = require('../models');

module.exports = {
  //get all Users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  //get a single user by id and populated thought and friend data
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          //   : res.json(user) //need to implement thought and friend data 
          : Thought.find({ _id: { $in: user.thoughts, $in: user.friends } }) //correct? need friends data
      )
      .then(() => res.json({ message: 'User and associated thought and friend data deleted!' }))
      .catch((err) => res.status(500).json(err));
  },

  //create a new user 
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  //update user by its id
  updateUser(req, res) {
    User.findOneAndUpdate( //findByid?
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this ID!' })
          : res.json(user)
      )
      .catch((err) =>
        res.status(500).json(err));
  },

  //delete to remove user by its id
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: 'User and associated apps deleted!' }))
      .catch((err) => res.status(500).json(err));
  },

};

//POST to add a new friend to a user's friend list

//DELETE to remove a friend from a user's friend list