import { Router } from 'express';

import * as userController from './controller/user.controller';
import * as todoController from './controller/todo.controller';
import * as ChoiceController from './controller/choice.controller';

const router = Router();

router.get('/', (req, res) => {
  res.send('hello from router, i love typescript');
});

router.post('/login', userController.loginUser);
router.post('/signup', userController.signupUser);

router.get('/user/:userId', userController.getUser);

router.get('/user/:userId/todo', todoController.getTodos);
router.post('/todo', todoController.postTodo);
router.put('/todo/:todoId/:type', todoController.markTodo);

router.get('/choice/today/:userId', ChoiceController.getTodayBeerOption);
router.post('/choice/:type', ChoiceController.postBeerOption);

// config
router.post('/config/:type', userController.editConfig);

router.get('/user/:userId/wishlist', userController.getWishlist);
router.get('/user/:userId/wishlist/detail', userController.getWishlistDetail);
router.post('/wishlist', userController.addToWishlist);

export default router;
