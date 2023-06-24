import { FastifyInstance } from 'fastify'
import { AuthController } from './controller/Auth'
import { UserController } from './controller/User'
import { isAuth } from './middleware/isAuth'

const userController = new UserController()
const authController = new AuthController()

export async function appRoutesPublic(app: FastifyInstance) {
  app.post('/auth/sign', authController.singIn)
}
export async function appRoutesPrivate(app: FastifyInstance) {
  app

    .addHook('onRequest', isAuth)
    .post('/users', userController.create)
    .get('/users', userController.index)
    .get('/users/:id', userController.show)
    .put('/users/:id', userController.update)
}
