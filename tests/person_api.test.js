const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Person = require('../models/person');

const api = supertest(app);
const initPersons = [
    { name: 'Stac Virus', number: '+237-45681297' },
    { name: 'Christopher Woo', number: '+237-650213876' }
];

beforeEach(async () => {
    await Person.deleteMany({});
    let personObject = new Person(initPersons[0]);
    await personObject.save()
    personObject = new Person(initPersons[1])
    await personObject.save()
}, 100000)

test('persons are returned as json', async () => {
    await api.get('/api/persons')
        .expect(200)
        .expect('Content-Type', /application\/json/);
}, 100000);

test('there are two persons', async () => {
    const res = await api.get('/api/persons');
    expect(res.body).toHaveLength(initPersons.length);
}, 100000);

test('the first persons is stac virus', async () => {
    const res = await api.get('/api/persons');
    const name = res.body.map(r => r.name);
    expect(name).toContain('Stac Virus');
}, 100000);

afterAll(async () => {
    await mongoose.connection.close();
});