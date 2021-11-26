const { expect } = require('@jest/globals');
const server = require("../src/server");
const request = require("supertest");
const data = require('../src/data/persons.json');

describe("HTTP server", function () {
    test("Should get an array of data", async () => {
        const expectedResponse = data;
        const response = await request(server).get('/persons');
        if (expectedResponse.length > 0) {
            expect(response.body).toEqual(expectedResponse);
        } else {
            expect(response.body).toEqual([]);
        }
        
    });
});