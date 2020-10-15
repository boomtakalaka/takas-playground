import test from 'ava'
import request from 'supertest'
import app from '../app.js'

test('Test the app', async t => {
    const res = await request(app).get('/')
    t.deepEqual(res.status, 200)
})
