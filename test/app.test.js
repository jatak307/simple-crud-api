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

    test("Should get an object by its ID", async () => {
        const somePerson = data[data.length - 1];
        const somePersonID = somePerson.id;
        const response = await request(server).get(`/persons/${somePersonID}`);

        expect(response.body.id).toBe(somePerson.id);
    });

    test("Should update the previously created object. IDs of the original object and the updated one must match", async () => {
        const somePerson = data[data.length - 1];
        const updatePersonValues = {
            "name": "Venom",
            "hobbies": ["tearing off heads", "journalism"]
        };
        const response = await request(server).put(`/persons/${somePerson.id}`).send(updatePersonValues);

        expect(response.body.id).toBe(somePerson.id);
        expect(response.body.name).toBe(updatePersonValues.name);
        expect(response.body.hobbies[1]).toBe(updatePersonValues.hobbies[1]);
    });

    test("Should delete the object with the specified ID and receive a message about successful deletion", async () => {
        const somePerson = data[data.length - 1];
        const responseObj = { message: `Person ${somePerson.id} removed` };

        const response = await request(server).delete(`/persons/${somePerson.id}`);
        expect(response.body.message).toBe(responseObj.message);
    });
});