const { Thought, User } = require('../models');

module.exports = {
    //getting all thoughts 
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
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
    //create a thought //creating a thought with a new ID? and it is creating a new ID?
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: thought._id } },
                    { new: true }
                );
            })
            .then(() => res.json('Created new thought!')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
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
            .then(() => res.json({ message: 'Thought successfully deleted!' })
            )
            .catch((err) => res.status(500).json(err));
    },
};

//POST to create a reaction stored in a single thought's reactions array field

//DELETE to pull and remove a reaction by the reaction's reactionId value