// Basic File Structure
  // install dependencies
    // mongoose
    // express
  // server.js
    // get a basic server starting and listening


// Mongo Stuff
  // Models
    // User
      // thoughts ([])
        // type: Schema.Types.ObjectId,
        // ref: Thoughts model
      // friends ([])
        // type: Schema.Types.ObjectId,
        // ref: User model
        // look at activity populate 23
      // virtual
        // getter for friends.length
        // look at activity virtuals 21
    // Thoughts
      // reactions
        // linked to the reaction schema
        // like subdocuments activity 17
      // virtual
        // getter for reactions.length
        // look at activity virtuals 21
  // Schema Only
    // Reaction

// Getting Mongoose connected
  // proper connection file with db name
  // db.once in server.js

// Seed data
  // pull in models needed (Users, Thoughts)
  // Delete all users and thoughts
  // data.js
    // array of 3 users
      // empty array of thoughts
      // empty array of friends
    // array of 3 thoughts
      // empty array of reactions

// Routes
  // userRoutes
    // /users
      // getting all Users
      // creating a user
        // ezpz
    // /users/:id
      // get a single user
        // populate (friends)
        // populate (thoughts)
      // update a user
      // delete a user
    // /thoughts
      // getting all thoughts
      // creating a thought
        // create the thought first
          // find the user by username, or userId and push the thought in there

// Controllers
  // user-controller
    // one method per http method
  // thoughts-controller
    // one method per http method