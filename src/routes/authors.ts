import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()



const router = express.Router()

router.get('/', async (req, res) => {
    const authors = await prisma.author.findMany()
    res.status(200).json(authors)
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const author = await prisma.author.findUnique({
        where: {
            id: Number(id)
        }
    })
    res.status(200).json(author)
})

router.post('/', async (req, res) => {
    // Create author
    const { name, country } = req.body
    const author = await prisma.author.create({
        data: {
            name,
            country
        }
    })
    res.status(201).json(author)
})

router.put('/:id', async (req, res) => {
    // Update author
    const { id } = req.params
    const { name, country } = req.body
    const author = await prisma.author.update({
        where: {
            id: Number(id)
        },
        data: {
            name,
            country
        }
    })
    res.status(200).json(author)
})

router.delete('/:id', async (req, res) => {
    // Delete author
    const { id } = req.params
    const author = await prisma.author.delete({
        where: {
            id: Number(id)
        }
    })
    res.status(200).json(author)    
})

export default router