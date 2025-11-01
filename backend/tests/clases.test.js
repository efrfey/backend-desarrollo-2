import request from 'supertest'
import mongoose from 'mongoose'
import app from '../src/app.js'
import dotenv from 'dotenv'

dotenv.config()

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI)
})

afterAll(async () => {
  await mongoose.connection.close()
})

describe('API /api/clases', () => {
  test('POST crea una clase', async () => {
    const payload = {
      docenteId: '999',
      curso: 'Test Curso',
      hora: '09:00',
      estado: 'Activa',
      fecha: '2025-10-30'
    }

    const res = await request(app).post('/api/clases').send(payload)
    expect(res.statusCode).toBe(201)
    expect(res.body).toHaveProperty('_id')
    expect(res.body.docenteId).toBe(payload.docenteId)
  })

  test('GET lista clases por docenteId y fecha', async () => {
    const docenteId = '999'
    const fecha = '2025-10-30'

    const res = await request(app).get('/api/clases').query({ docenteId, fecha })
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })
})
