import request from 'supertest'
import mongoose from 'mongoose'
import app from '../app'
import { describe, it, expect, afterAll } from 'vitest'

describe('GET /items', () => {
    it('Should return all items with status 200', async () => {
        const response = await request(app).get('/home/items')
        expect(response.statusCode).toBe(200)
        expect(Array.isArray(response.body)).toBe(true)
    })
})
afterAll(async () => {
    await mongoose.connection.close()
})