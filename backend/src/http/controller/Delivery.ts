import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

type IndexBody = {
  page?: number
  pagesize?: number
  search?: string
}

export class DeliveryController {
  async index(req: FastifyRequest, res: FastifyReply) {
    const body = req.query as IndexBody

    const pagesize = body?.pagesize ? Number(body?.pagesize) : 10
    const page = body?.page ? Number(body?.page) : 0

    const user = await prisma.usuario.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        id: true,
        tipo: true,
      },
    })

    const delivers = await prisma.entrega.findMany({
      take: pagesize,
      skip: page * pagesize,
      select: {
        codigo: true,
        localColeta: true,
        material: true,
        peso: true,
        localDescarga: true,
        horarioColeta: true,
        horarioEntrega: true,

        usuario: {
          select: {
            nome: true,
            sobrenome: true,
            id: true,
          },
        },
      },
      where: {
        usuarioId: user?.tipo === 'motorista' ? user.id : undefined,
      },
    })
    const deliversTotal = await prisma.entrega.count()

    return res.send({
      delivers,
      page,
      pagesize,
      total: deliversTotal,
    })
  }

  async create(req: FastifyRequest, res: FastifyReply) {
    const registerBodySchema = z.object({
      localColeta: z.string().optional(),
      material: z.string().optional(),
      peso: z.number().optional(),
      localDescarga: z.string().optional(),
      horarioColeta: z.string().datetime().optional(),
      horarioEntrega: z.string().datetime().optional(),
    })

    const body = registerBodySchema.safeParse(req.body)

    if (!body.success) {
      return res.status(400).send(body.error)
    }

    const created = await prisma.entrega.create({
      data: {
        ...body.data,
        usuarioId: req.user.id,
      },
    })

    return res.status(201).send(created)
  }

  async update(req: FastifyRequest, res: FastifyReply) {
    const { codigo } = req.params as any

    if (!codigo) {
      return res.status(403).send({ error: 'Cod not valid', statusCode: 403 })
    }

    const findDelivery = await prisma.entrega.findUnique({
      select: {
        codigo: true,
      },
      where: {
        codigo: Number(codigo),
      },
    })

    if (!findDelivery)
      return res.status(403).send({ error: 'User not exist', statusCode: 403 })

    const registerBodySchema = z.object({
      localColeta: z.string().optional(),
      material: z.string().optional(),
      peso: z.number().optional(),
      localDescarga: z.string().optional(),
      horarioColeta: z.string().datetime().optional(),
      horarioEntrega: z.string().datetime().optional(),
    })

    const body = registerBodySchema.safeParse(req.body)

    if (!body.success) {
      return res.status(400).send(body.error)
    }

    const updated = await prisma.entrega.update({
      where: {
        codigo: findDelivery.codigo,
      },
      data: body.data,
    })

    return res.status(201).send(updated)
  }

  async show(req: FastifyRequest, res: FastifyReply) {
    const { codigo } = req.params as any

    if (!codigo) {
      return res
        .status(403)
        .send({ error: 'Protocolo not valid', statusCode: 403 })
    }

    const delivery = await prisma.entrega.findUnique({
      select: {
        codigo: true,
        localColeta: true,
        material: true,
        peso: true,
        localDescarga: true,
        horarioColeta: true,
        horarioEntrega: true,
      },
      where: {
        codigo: Number(codigo),
      },
    })

    if (!delivery) {
      return res.status(403).send({ error: 'User not exist', statusCode: 403 })
    }

    return res.status(200).send(delivery)
  }
}
