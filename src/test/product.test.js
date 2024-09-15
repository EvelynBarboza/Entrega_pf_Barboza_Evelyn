const chai = require('chai')
const supertest = require('supertest')

const expect = chai.expect
const requester = supertest('https://localhost:8080')

describe('Test del crud para traer todos los products', ()=>{
    let productsID
    it('Get para traer todos los products', async ()=>{
        const {
            statusCode,
            _body,
            ok
        } = await requester.get('/api/products')

        expect(statusCode).to.equal(200)
        expect(_body).to.have.prperty('payload')
        expect(_body).to.be.an('array')
    })
})

