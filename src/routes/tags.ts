import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()



const router = express.Router()

router.get('/', async (req, res) => {
    const tags = await prisma.tag.findMany({
        include: {
            books: {
                include: {
                    authors: true
                }
            }
        }
    })
    res.status(200).json(tags)
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const tag = await prisma.tag.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            books: {
                include: {
                    authors: true
                }
            }
        }
    })
    res.status(200).json(tag)
})

export default router

