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

    test("Should write a new person to the data array and get the object of the new person", async () => {
        const newPerson = {
            "name": "Voltron",
            "age": 3000,
            "hobbies": ["to save the world", "dancing"]
        };
        const response = await request(server).post('/persons').send(newPerson);

        expect(response.body.id).toBeDefined();
        expect(response.body.name).toBe('Voltron');
        expect(response.body.age).toBe(3000);
        expect(response.body.hobbies).toEqual(["to save the world", "dancing"]);
    });
});