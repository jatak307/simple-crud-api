const { expect } = require('@jest/globals');
const server = require("../src/server");
const request = require("supertest");
const data = require('../src/data/persons.json');

describe("HTTP server", function () {
    test("Should get an empty array", async () => {
        const expectedResponse = data;
        const response = await request(server).get('/persons');
        expect(response.body).toEqual(expectedResponse);
    });
});