const router = require('express').Router();

const {
  addThought,
  removeThought,
  addReaction,
  removeReaction,
  getAllThoughts,
  getThoughtById,
  updateThoughtById,
  updateReactionById
} = require('../../controllers/thoughtController.js');

//GET all thoughts & POST a thought
router.route('/')
.get(getAllThoughts)
.post(addThought);

//GET a thought by ID
router.route('/:id')
.get(getThoughtById)
.put(updateThoughtById);

//DELETE thought by ID
router.route('/:id/users/:userId')
.put(updateThoughtById)
.delete(removeThought);


//add a reaction & update thought
router.route('/:id/reactions/')
.post(addReaction);

//delete a reaction update thought
router.route('/:id/reactions/:reactionId')
.put(updateReactionById)
.delete(removeReaction);

module.exports = router;