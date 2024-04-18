import express from 'express'
import { PrismaClient } from '@prisma/client'
import { log } from 'console'

const prisma = new PrismaClient()



const router = express.Router()

router.get('/', async (req, res) => {
    const books = await prisma.book.findMany({
        include: {
            tags: true,
            authors: true,
            genres: true
        }
    })
    res.status(200).json(books)
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const book = await prisma.book.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            tags: true,
            authors: true,
            genres: true
        }
    })
    res.status(200).json(book)
})



const ProcessAuthors = (authors: any) => {
    if (!authors) {
        return []
    } else {
        return authors.map((author: any) => ({
            where: { name: author.name },
            create: { name: author.name, country: author.country || "Unknown" }
        }));
    }
}

const ProcessGenres = (genres: any) => {
    if (!genres) {
        return []
    } else {
        return genres.map((genre: any) => ({
            where: { name: genre.name },
            create: { name: genre.name }
        }));
    }
}

const ProcessTags = (tags: any) => {
    if (!tags) {
        return []
    } else {
        return tags.map((tag: any) => ({
            where: { name: tag.name },
            create: { name: tag.name }
        }));
    }
}

router.post('/', async (req, res) => {
    // Create book
    const { title, publicationDate, ISBN, pages, status, genres, authors, tags, description, notes } = req.body

    // Process authors and genres in case they are not in the database
    const processedAuthors = ProcessAuthors(authors)
    const processedTags = ProcessTags(tags)
    console.log(processedTags)
    const processedGenres = ProcessGenres(genres)

    try {
        const book = await prisma.book.create({
            data: {
                title,
                publicationDate: new Date(publicationDate),
                ISBN,
                pages,
                status,
                description,
                notes,
                genres: {
                    connectOrCreate: processedGenres
                },
                authors: {
                    connectOrCreate: processedAuthors
                },
                tags: {
                    connectOrCreate: processedTags
                }
            }
        })

        res.status(201).json(book)
    } catch (error) {
        console.error("Failed to create book:", error);
        res.status(500).json({ error: "Failed to create book" });
    }
})

router.put('/:id', async (req, res) => {
    // Update book
    const { id } = req.params
    const { title, publicationDate, ISBN, pages, status, genres, authors, tags, description, notes } = req.body

    // Process authors and genres in case they are not in the database
    const processedAuthors = ProcessAuthors(authors)
    const processedTags = ProcessTags(tags)
    const processedGenres = ProcessGenres(genres)

    const book = await prisma.book.update({
        where: {
            id: Number(id)
        },
        data: {
            title,
            publicationDate: new Date(publicationDate),
            ISBN,
            pages,
            description,
            notes,
            status,
            genres: {
                connectOrCreate: processedGenres
            },
            authors: {
                connectOrCreate: processedAuthors
            },
            tags: {
                connectOrCreate: processedTags
            }
        }
    })

    res.status(200).json(book)
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {

        const book = await prisma.book.delete({
            where: {
                id: Number(id)
            }
        })  
        res.status(204).json(book)
    } catch (error) {
        console.error("Failed to delete book:", error);
        res.status(500).json({ error: "Failed to delete book" });
    }

})

export default router


