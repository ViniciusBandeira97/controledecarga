import { prisma } from '@/lib/prisma'
import argon from 'argon2'
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
    const page = body?.page ?? 0

    const users = await prisma.usuario.findMany({
      take: pagesize,
      skip: page * pagesize,
      select: {
        id: true,
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
      matricula: z.string(),
      cpf: z.string(),
      nome: z.string(),
      sobrenome: z.string(),
      genero: z.string(),
      dataNascimento: z.string().datetime(),
      telefone: z.string(),
      endereco: z.string(),
      estado: z.string(),
      cidade: z.string(),
      cep: z.string(),
      senha: z.string(),
      tipo: z.string(),
    })

    const body = registerBodySchema.safeParse(req.body)

    if (!body.success) {
      return res.status(400).send(body.error)
    }

    const hashedPassword = await argon.hash(body.data.senha)

    const created = await prisma.usuario.create({
      data: {
        ...body.data,
        senha: hashedPassword,
      },
    })

    return res.status(201).send(created)
  }

  async update(req: FastifyRequest, res: FastifyReply) {
    const { id } = req.params as any

    if (!id) {
      return res.status(403).send({ error: 'Id not valid', statusCode: 403 })
    }

    const findUser = await prisma.usuario.findUnique({
      select: {
        id: true,
      },
      where: {
        id,
      },
    })

    if (!findUser)
      return res.status(403).send({ error: 'User not exist', statusCode: 403 })

    const registerBodySchema = z.object({
      matricula: z.string().optional(),
      cpf: z.string().optional(),
      nome: z.string().optional(),
      sobrenome: z.string().optional(),
      genero: z.string().optional(),
      dataNascimento: z.string().datetime().optional(),
      telefone: z.string().optional(),
      endereco: z.string().optional(),
      estado: z.string().optional(),
      cidade: z.string().optional(),
      cep: z.string().optional(),
      senha: z.string().optional(),
      tipo: z.string().optional(),
    })

    const body = registerBodySchema.safeParse(req.body)

    if (!body.success) {
      return res.status(400).send(body.error)
    }

    const hashedPassword = body.data.senha
      ? await argon.hash(body.data.senha)
      : undefined

    const created = await prisma.usuario.update({
      where: {
        id: findUser.id,
      },
      data: {
        ...body.data,
        senha: hashedPassword,
      },
    })

    return res.status(201).send(created)
  }

  async show(req: FastifyRequest, res: FastifyReply) {
    const { id } = req.params as any

    if (!id) {
      return res.status(403).send({ error: 'Id not valid', statusCode: 403 })
    }

    const user = await prisma.usuario.findUnique({
      select: {
        id: true,
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
        tipo: true,
      },
      where: {
        id,
      },
    })

    if (!user) {
      return res.status(403).send({ error: 'User not exist', statusCode: 403 })
    }

    return res.status(200).send(user)
  }
}
