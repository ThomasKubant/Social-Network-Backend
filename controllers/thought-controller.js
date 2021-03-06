const {Thought} = require('../models');
const {User} = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                
                res.status(400).json(err);
            })
    },
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    return res.status(404).json({ message: 'No thought found with this id.' })
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.json(err))
    },
    createThought({ body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    {_id: body.userId},
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if(!dbUserData) {
                    return res.status(404).json({ message: 'No user found with this id.' });
                }
                res.json(dbUserData)
            })
            .catch(err => res.json(err))
    },
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            {_id: params.id},
            body,
            { new: true, runVaidators: true}
        )
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    return res.status(404).json({ message: 'No thought found with this id.' })
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.json(err))
    },
    deleteThought({ params, body }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err))
    },
    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true }
        )
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err))
    },
    deleteReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: body.reactionId } } },
            { new: true }
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    }
}

module.exports = thoughtController