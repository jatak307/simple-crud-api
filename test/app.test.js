const { expect } = require('@jest/globals');
const server = require("../src/server");
const request = require("supertest");
const data = require('../src/data/persons.json');

let persID = null;

describe("HTTP server", function () {
    test("Scenario #1. GET: should get an array of data", async () => {
        const response = await request(server).get('/persons');

        if (data.length > 0) {
            expect(response.body).toEqual(data);
        } else {
            expect(response.body).toEqual([]);
        }
    });

    test("Scenario #2. POST: should write a new person to the data array and get the object of the new person", async () => {
        const newPerson = {
            "name": "Voltron",
            "age": 3000,
            "hobbies": ["to save the world", "dancing"]
        };
        const response = await request(server).post('/persons').send(newPerson);

        expect(response.body.id).toBeDefined();
        expect(response.body.name).toBe(newPerson.name);
        expect(response.body.age).toBe(newPerson.age);
        expect(response.body.hobbies).toEqual(newPerson.hobbies);
    });

    test("Scenario #3. GET: should get an object by its ID", async () => {
        const somePerson = data[data.length - 1];
        persID = somePerson.id;
        const response = await request(server).get(`/persons/${persID}`);

        expect(response.body.id).toBe(persID);
    });

    test("Scenario #4. PUT: should update the previously created object. IDs of the original object and the updated one must match", async () => {
        const updatePersonValues = {
            "name": "Venom",
            "hobbies": ["tearing off heads", "journalism"]
        };
        const response = await request(server).put(`/persons/${persID}`).send(updatePersonValues);

        expect(response.body.id).toBe(persID);
        expect(response.body.name).toBe(updatePersonValues.name);
        expect(response.body.hobbies[1]).toBe(updatePersonValues.hobbies[1]);
    });

    test("Scenario #5. DELETE: should delete the object with the specified ID and receive a message about successful deletion", async () => {
        const response = await request(server).delete(`/persons/${persID}`);

        expect(response.statusCode).toBe(204);
    });

    test("Scenario #6. GET: should receive an answer that the person with the specified ID was not found", async () => {
        const responseObj = { message: `Person with ID ${persID} not found` };
        const response = await request(server).get(`/persons/${persID}`);

        expect(response.body.message).toBe(responseObj.message);
    });
});