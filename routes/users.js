const router = require('express').Router();

const {
  getUsers, getUserById, createUser, updateUserInfo, updateUserAvatar, login
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.patch('/me', updateUserInfo);
router.patch('/me/avatar', updateUserAvatar);

router.post('/login',login)

module.exports = router;
