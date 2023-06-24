import fastify from 'fastify'
import { appRoutesPrivate, appRoutesPublic } from './http/routes'

export const app = fastify()

app.register(appRoutesPrivate)
app.register(appRoutesPublic)
