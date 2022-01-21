const router = require('express').Router();

const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');
const friendRoutes = require('./friendRoutes');
const rectionRoutes = require('./reactionRoutes.js');

router.use('/thought', thoughtRoutes);
router.use('/user', userRoutes);
router.use('/friend', friendRoutes);
router.use('/reaction', reactionRoutes);

module.exports = router;
