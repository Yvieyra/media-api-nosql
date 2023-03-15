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
                    ? res.status(404).json({ message: 'No thought with this ID found!' })
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
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                );
            })
                .then((user) =>
                    !user
                        ? res.status(404).json({
                            message: 'Thought created, but found no user with that ID',
                        })
                        : res.json('Created new thought!')
                )
                .catch((err) => {
                    console.log(err);
                    res.status(500).json(err);
                })
            );
    },
    //Update a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this ID!' })
                    : res.json(thought)
            )
            .catch((err) =>
                res.status(500).json(err));
    },
    //delete a thought 
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId } },
                        { new: true }
                    )
            )
            .then((user) =>
                !user
                    ? res.status(404).json({
                        message: 'Thought created, but no user with this ID!'
                    })
                    : res.json({ message: 'Thought successfully deleted!' })
            )
            .catch((err) => res.status(500).json(err));
    },
};

//POST to create a reaction stored in a single thought's reactions array field

//DELETE to pull and remove a reaction by the reaction's reactionId value