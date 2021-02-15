const supertest = require('supertest');
const app = require('../config/server');
const { MONGOURI } = require('../config/config');
const mongoose = require('mongoose');

const server = supertest(app);
const mongo = MONGOURI;

describe('Api Test', () => {
    let token
    const user = "usertest" + Math.random() * (10000 - 1) + 1;
    beforeAll(async () => {
        const url = mongo;
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    beforeAll(async () => {
        response = await server
            .post('/api/users/login')
            .send({
                username: "luis8alopez",
                password: "luis",
            })
        token = response.body.token;
    });

    describe('Get All Coins', () => {
        let response;
        beforeAll(async () => {
            try {
                response = await server
                    .get('/api/crypto/coins')
                    .set('Authorization', token)

            } catch (err) {
                throw err;
            }
        });

        it('should return status code 200', () => {
            expect(response.status).toBe(200);
        });

        it('should return message in body', () => {
            expect(response.body).toHaveProperty('message');
        });
        it('should return data in body', () => {
            expect(response.body).toHaveProperty('data');
        });
        it('should return allCoin in message', () => {
            expect(response.body.message).toBe('allCoins');
        });
        it('should return an Array in data', () => {
            expect(Array.isArray(response.body.data)).toBeTruthy();
        });
        it('should have name inside data', () => {
            expect(response.body.data[0]).toHaveProperty('name');
        });
        it('should have symbol inside data', () => {
            expect(response.body.data[0]).toHaveProperty('symbol');
        });
        it('should have image inside data', () => {
            expect(response.body.data[0]).toHaveProperty('image');
        });
        it('should have current_price inside data', () => {
            expect(response.body.data[0]).toHaveProperty('current_price');
        });
        it('should have last_updated inside data', () => {
            expect(response.body.data[0]).toHaveProperty('last_updated');
        });
    });

    describe('get Top Coins', () => {
        let response;
        beforeAll(async () => {
            try {
                response = await server
                    .get('/api/crypto/luis8alopez/coins')
                    .set('Authorization', token)
                    .query({ limit: 23 })

            } catch (err) {
                throw err;
            }
        });

        it('should return status code 200', () => {
            expect(response.status).toBe(200);
        });
        it('should return message in body', () => {
            expect(response.body).toHaveProperty('message');
        });
        it('should return data in body', () => {
            expect(response.body).toHaveProperty('data');
        });
        it('should return allCoin in message', () => {
            expect(response.body.message).toBe('Your top crypto');
        });
        it('should return an Array in data', () => {
            expect(Array.isArray(response.body.data)).toBeTruthy();
        });
        it('should have a length minor or equal to 25', () => {
            expect(response.body.data.length).toBeLessThanOrEqual(25);
        });
        it('should have name inside data', () => {
            expect(response.body.data[0]).toHaveProperty('name');
        });
        it('should have symbol inside data', () => {
            expect(response.body.data[0]).toHaveProperty('symbol');
        });
        it('should have thumb inside data', () => {
            expect(response.body.data[0]).toHaveProperty('thumb');
        });
        it('should have ars inside data', () => {
            expect(response.body.data[0]).toHaveProperty('ars');
        });
        it('should have usd inside data', () => {
            expect(response.body.data[0]).toHaveProperty('usd');
        });
        it('should have eur inside data', () => {
            expect(response.body.data[0]).toHaveProperty('eur');
        });
        it('should have last_updated inside data', () => {
            expect(response.body.data[0]).toHaveProperty('last_updated');
        });
    });

    describe('Create new user', () => {
        let response;
        beforeAll(async () => {
            try {
                response = await server
                    .post('/api/users')
                    .set('Authorization', token)
                    .send({
                        name: "Luis",
                        lastname: "Ochoa",
                        username: user,
                        password: "12458adsj",
                        preferredCoin: "usd"
                    })
                //userDelete = await server.delete(`/api/users/${user}`)

            } catch (err) {
                throw err;
            }
        });
        it('should return status code 200', () => {
            expect(response.status).toBe(200);
        });
    })

    describe('Add Coin for Follow up', () => {
        let response;
        beforeAll(async () => {
            try {
                response = await server
                    .post('/api/users/login')
                    .send({
                        username: user,
                        password: "12458adsj",
                    })
                token = response.body.token;
                response = await server
                    .post(`/api/crypto/${user}/coins`)
                    .set('Authorization', token)
                    .send({ coin: 'litecoin' })

            } catch (err) {
                throw err;
            }
        });
        it('should return status code 200', () => {
            expect(response.status).toBe(200);
        });
        it('should return message in body', () => {
            expect(response.body).toHaveProperty('message');
        });
        it('should return allCoin in message', () => {
            expect(response.body.message).toBe('Coin added');
        });
    });
    afterAll(() => mongoose.disconnect());
});

jest.setTimeout(10000);