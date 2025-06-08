import request from 'supertest'
import mongoose from 'mongoose'
import app from '../app'
import { describe, it, expect, afterAll } from 'vitest'

describe('GET /items', () => {
    it('Should return all items with status 201', async () => {
        const response = await request(app).get('/api/v1/products')
        expect(response.statusCode).toBe(201)
        expect(Array.isArray(response.body.products)).toBe(true)
    })
})
afterAll(async () => {
    await mongoose.connection.close()
})