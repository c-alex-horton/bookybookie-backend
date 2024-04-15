import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()



const router = express.Router()

router.get('/', async (req, res) => {
    const books = await prisma.book.findMany()
    res.status(200).json(books)
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const book = await prisma.book.findUnique({
        where: {
            id: Number(id)
        }
    })
    res.status(200).json(book)
})

router.post('/', async (req, res) => {
    // Create book
    const { title, publicationDate, ISBN, pages, status, genres, authors, tags } = req.body

    // Process authors and genres in case they are not in the database
    const processedAuthors = authors.map((author: any) => ({
        where: { name: author },
        create: { name: author, country: "" }
    }));

    const processedGenres = genres.map((genre: any) => ({
        where: { name: genre },
        create: { name: genre }
    }));

    const book = await prisma.book.create({
        data: {
            title,
            publicationDate,
            ISBN,
            pages,
            status,
            genres: {
                connectOrCreate: processedGenres
            },
            authors: {
                connectOrCreate: processedAuthors
            },
            tags
        }
    })

    res.status(201).json(book)
})

router.put('/:id', async (req, res) => {
    // Update book
    const { id } = req.params
    const { title, publicationDate, ISBN, pages, status, genres, authors, tags } = req.body

    // Process authors and genres in case they are not in the database
    const processedAuthors = authors.map((author: any) => ({
        where: { name: author },
        create: { name: author, country: "" }
    }));

    const processedGenres = genres.map((genre: any) => ({
        where: { name: genre },
        create: { name: genre }
    }));

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
            genres: {
                connectOrCreate: processedGenres
            },
            authors: {
                connectOrCreate: processedAuthors
            },
            tags
        }
    })

    res.status(200).json(book)
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    const book = await prisma.book.delete({
        where: {
            id: Number(id)
        }
    })
    res.status(204).json(book)
})

export default router


