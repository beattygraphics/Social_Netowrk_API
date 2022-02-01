const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  removeUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController.js');

//user getAll and post routes
router
.route('/')
.get(getAllUsers)
.post(createUser);

//user get one, update one, and delete one
router
.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(removeUser);

//user adds a friend
router.route('/:id/friends/:friendId')
.post(addFriend);

//user deletes a friend
router.route('/:id/friends/:friendId')
.delete(removeFriend);

module.exports = router;


