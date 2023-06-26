import { FastifyInstance } from 'fastify'
import { AuthController } from './controller/Auth'
import { DeliveryController } from './controller/Delivery'
import { UserController } from './controller/User'
import { isAuth } from './middleware/isAuth'

const userController = new UserController()
const authController = new AuthController()
const deliveryController = new DeliveryController()

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

    .post('/delivers', deliveryController.create)
    .get('/delivers', deliveryController.index)
    .get('/delivers/:codigo', deliveryController.show)
    .put('/delivers/:codigo', deliveryController.update)
}
