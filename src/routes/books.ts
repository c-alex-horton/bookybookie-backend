import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()



const router = express.Router()

router.get('/', async (req, res) => {
    const books = await prisma.book.findMany()
    res.json(books)
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const book = await prisma.book.findUnique({
        where: {
            id: Number(id)
        }
    })
    res.json(book)
})

router.post('/', async (req, res) => {
    // Create book
    const { title, publicationDate, ISBN, pages, status, genres, authors, tags } = req.body
    const book = await prisma.book.create({
        data: {
            title,
            publicationDate,
            ISBN,
            pages,
            status,
            genres,
            authors,
            tags
        }
    })
})

router.put('/:id', async (req, res) => {
    // Update book
    const { id } = req.params
    const { title, publicationDate, ISBN, pages, status, genres, authors, tags } = req.body
    const book = await prisma.book.update({
        where: {
            id: Number(id)
        },
        data: {
            title,
            publicationDate,
            ISBN,
            pages,
            status,
            genres,
            authors,
            tags
        }
    })
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    const book = await prisma.book.delete({
        where: {
            id: Number(id)
        }
    })
    res.json(book)
})

export default router


