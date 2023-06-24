import { env } from '@/env'
import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify'
import { verify } from 'jsonwebtoken'

interface ITokenPayload {
  accessUser: {
    id: string
    is_manager: boolean
    is_supervisor: boolean
  }

  iat: number
  exp: number
}

export function isAuth(
  req: FastifyRequest,
  res: FastifyReply,
  done: HookHandlerDoneFunction,
) {
  const header = req.headers

  const parts = String(header.authorization).split(' ')

  if (parts.length !== 2)
    return res.status(401).send({ error: 'Token malformed' })

  const [bearer, token] = parts

  if (bearer === 'Bearer ')
    return res.status(401).send({ error: 'Token error' })

  try {
    const payload = verify(token, env.AUTH_TOKEN) as ITokenPayload
    req.user = {
      id: payload.accessUser.id,
    }
  } catch (error) {
    return res.status(401).send({ error: 'Token invalid' })
  }

  return done()
}
