import request from 'supertest'
import { connection } from 'mongoose'
import app from '../app'

describe('GET /items', () => {
    it('Should return all items with status 200', async () => {
        const response = await request(app).get('/home/items')
        expect(response.statusCode).toBe(200)
        expect(Array.isArray(response.body)).toBe(true)
    })

    afterAll(async () => {
        await connection.close()
    })
})