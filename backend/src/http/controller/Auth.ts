import { env } from '@/env'
import { prisma } from '@/lib/prisma'
import argon from 'argon2'
import { FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

export class AuthController {
  async singIn(req: FastifyRequest, res: FastifyReply) {
    const registerBodySchema = z.object({
      cpf: z.string(),
      senha: z.string(),
    })
    const body = registerBodySchema.safeParse(req.body)

    if (!body.success) return res.status(400).send(body.error)

    const findUser = await prisma.usuario.findUnique({
      select: {
        senha: true,
        id: true,
        matricula: true,
        cpf: true,
        nome: true,
        sobrenome: true,
        tipo: true,
      },
      where: {
        cpf: body.data.cpf,
      },
    })
    if (!findUser)
      return res.status(403).send({ error: 'User not exist', statusCode: 403 })

    const passwordMatches = await argon.verify(findUser.senha, body.data.senha)

    if (!passwordMatches)
      return res.status(401).send({ error: 'Access Denied', statusCode: 401 })

    const accessToken = jwt.sign({ id: findUser.id }, env.AUTH_TOKEN, {
      expiresIn: '12h',
    })
    return res.send({
      user: findUser,
      token: accessToken,
    })
  }
}
