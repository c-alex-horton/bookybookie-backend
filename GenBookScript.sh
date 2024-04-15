#!/bin/bash

# API endpoint
API_URL="localhost:3000/books"

# Add 10 books
curl -X POST $API_URL -H "Content-Type: application/json" -d '{"title": "Book One", "publicationDate": "2023-01-01T00:00:00Z", "ISBN": "978-3-16-148410-0"}'
curl -X POST $API_URL -H "Content-Type: application/json" -d '{"title": "Book Two", "publicationDate": "2023-02-01T00:00:00Z", "ISBN": "978-3-16-148410-1"}'
curl -X POST $API_URL -H "Content-Type: application/json" -d '{"title": "Book Three", "publicationDate": "2023-03-01T00:00:00Z", "ISBN": "978-3-16-148410-2"}'
curl -X POST $API_URL -H "Content-Type: application/json" -d '{"title": "Book Four", "publicationDate": "2023-04-01T00:00:00Z", "ISBN": "978-3-16-148410-3"}'
curl -X POST $API_URL -H "Content-Type: application/json" -d '{"title": "Book Five", "publicationDate": "2023-05-01T00:00:00Z", "ISBN": "978-3-16-148410-4"}'
curl -X POST $API_URL -H "Content-Type: application/json" -d '{"title": "Book Six", "publicationDate": "2023-06-01T00:00:00Z", "ISBN": "978-3-16-148410-5"}'
curl -X POST $API_URL -H "Content-Type: application/json" -d '{"title": "Book Seven", "publicationDate": "2023-07-01T00:00:00Z", "ISBN": "978-3-16-148410-6"}'
curl -X POST $API_URL -H "Content-Type: application/json" -d '{"title": "Book Eight", "publicationDate": "2023-08-01T00:00:00Z", "ISBN": "978-3-16-148410-7"}'
curl -X POST $API_URL -H "Content-Type: application/json" -d '{"title": "Book Nine", "publicationDate": "2023-09-01T00:00:00Z", "ISBN": "978-3-16-148410-8"}'
curl -X POST $API_URL -H "Content-Type: application/json" -d '{"title": "Book Ten", "publicationDate": "2023-10-01T00:00:00Z", "ISBN": "978-3-16-148410-9"}'


# curl -X POST localhost:3000/books -H "Content-Type: application/json" -d '{"title": "Book One", "publicationDate": "2023-01-01T00:00:00Z", "ISBN": "978-3-16-148410-0"}'