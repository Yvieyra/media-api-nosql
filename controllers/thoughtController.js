const { Thought, User } = require('../models');

module.exports = {
    //getting all thoughts 
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .cath((err) => res.status(500).json(err));
    },
    //get one thought 
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No though with this ID found!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    //create a thought 
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { applications: application._id } },
                    { new: true }
                );
            })
                .then((user) =>
                    !user
                        ? res.status(404).json({
                            message: 'Application created, but found no user with that ID',
                        })
                        : res.json('Created new thought!')
                )
                .catch((err) => {
                    console.log(err);
                    res.status(500).json(err);
                })
            );

    },
}