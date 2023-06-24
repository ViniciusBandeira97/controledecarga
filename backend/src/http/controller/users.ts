import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

type IndexBody = {
  page?: number
  pagesize?: number
  search?: string
}

export class UserController {
  async index(req: FastifyRequest, res: FastifyReply) {
    const body = req.body as IndexBody

    const pagesize = body?.pagesize ?? 10
    const page = body?.page ?? 10

    const users = await prisma.usuario.findMany({
      take: pagesize,
      skip: page * pagesize,
      select: {
        matricula: true,
        cpf: true,
        nome: true,
        sobrenome: true,
        genero: true,
        dataNascimento: true,
        telefone: true,
        endereco: true,
        estado: true,
        cidade: true,
        cep: true,
        senha: true,
        tipo: true,
      },
    })
    const usersTotal = await prisma.usuario.count()

    return res.send({
      data: users,
      page,
      pagesize,
      total: usersTotal,
    })
  }

  async create(req: FastifyRequest, res: FastifyReply) {
    const registerBodySchema = z.object({
      nome: z.string(),
      senha: z.string().min(6),
    })

    const data = registerBodySchema.parse(req.body)

    return res.send(data)
  }
}
