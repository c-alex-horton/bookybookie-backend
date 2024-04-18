import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()



const router = express.Router()

router.get('/', async (req, res) => {
    const genres = await prisma.genre.findMany({
        include: {
            books: true
        }
    })
    res.status(200).json(genres)
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const genre = await prisma.genre.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            books: true
        }
    })
    res.status(200).json(genre)
})

router.post('/', async (req, res) => {
    // Create genre
    const { name } = req.body
    const genre = await prisma.genre.create({
        data: {
            name
        }
    })
    res.status(201).json(genre)
})

router.put('/:id', async (req, res) => {
    // Update genre
    const { id } = req.params
    const { name } = req.body
    const genre = await prisma.genre.update({
        where: {
            id: Number(id)
        },
        data: {
            name
        }
    })
    res.status(200).json(genre) 
})

router.delete('/:id', async (req, res) => {
    // Delete genre
    const { id } = req.params
    const genre = await prisma.genre.delete({
        where: {
            id: Number(id)
        }
    })
    res.status(200).json(genre)
})

export default router