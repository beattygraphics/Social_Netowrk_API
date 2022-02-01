const { User, Thought } = require('../models')

const userController = {
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: ('-__v')
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    },
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
          .populate({
            path: "thoughts",
            select: "-__v",
          })
          .select("-__v")
          .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: "No user found with this id!" });
              return;
            }
            res.json(dbUserData);
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json(err);
          });
      },
    createUser({ body }, res) {
        console.log("BODY OBJECT", body)

        //check if user email exists before saving and then show an error and DO NOT try to save

        //query users by the email in the body (body.email)
        //if user found do something like 
        // res.status(400).send({"message":"Email exists"});
        // -- check for error code to use instead of 400 or not

        //if the user wasn't found, continue to save
        const user = new User(body);
  
        try {
          user.save().then((mongoRes)=>{
            console.log("MONGO RESPONSE:",mongoRes)
            res.send(user);
          })
          .catch(error=>{
            res.status(500).send(error);
          });
          
        } catch (error) {
          res.status(500).send(error);
        }

        // User.create(body)
        //     .then(dbUserData => res.json(dbUserData))
        //     .catch(err => {
        //         console.log(err)
        //         res.status(400).json(err)
        //     })
    },
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, {
          new: true,
          runValidators: true,
        })
          .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: "No user found with this id!" });
              return;
            }
            res.json(dbUserData);
          })
          .catch((err) => res.status(400).json(err));
      },
      removeUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
          .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: "No user found with this id" });
              return;
            }
            User.updateMany(
              { _id: { $in: dbUserData.friends } },
              { $pull: { friends: params.id } }
            )
              .then(() => {
                Thought.deleteMany({ username: dbUserData.username })
                  .then(() => {
                    res.json({ message: "Successfully deleted user" });
                  })
                  .catch((err) => res.status(400).json(err));
              })
              .catch((err) => res.status(400).json(err));
          })
          .catch((err) => res.status(400).json(err));
      },
    addFriend({ params }, res) {
        User.findByIdAndUpdate(
          { _id: params.id },
          { $addToSet: { friends: params.friendId } },
          { new: true }
        )
          .select("-__v")
          .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: "No user found with this id!" });
              return;
            }
            res.json(dbUserData);
          })
          .catch((err) => {
            res.status(400).json(err);
          });
      },
      removeFriend({ params }, res) {
        User.findByIdAndUpdate(
          { _id: params.id },
          { $pull: { friends: params.friendId } },
          { new: true, runValidators: true }
        )
          .select("-__v")
          .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: "No friend found with this id!" });
              return;
            }
            res.json(dbUserData);
          })
          .catch((err) => res.status(400).json(err));
      },
}

module.exports = userController