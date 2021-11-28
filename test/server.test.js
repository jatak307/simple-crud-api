const { expect } = require('@jest/globals');
const server = require("../src/server");
const request = require("supertest");
const data = require('../src/data/persons.json');
const { writeDataToFile } = require('../src/utils/write-to-file');

let persID = null;

describe("SCENARIO #1", function () {
    test("GET: should get an array of data", async () => {
        const response = await request(server).get('/persons');

        if (data.length > 0) {
            expect(response.body).toEqual(data);
        } else {
            expect(response.body).toEqual([]);
        }
    });

    test("POST: should write a new person to the data array and get the object of the new person", async () => {
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

    test("GET: should get an object by its ID", async () => {
        const somePerson = data[data.length - 1];
        persID = somePerson.id;
        const response = await request(server).get(`/persons/${persID}`);

        expect(response.body.id).toBe(persID);
    });   

    test("PUT: should update the previously created object. IDs of the original object and the updated one must match", async () => {
        const updatePersonValues = {
            "name": "Venom",
            "hobbies": ["tearing off heads", "journalism"]
        };
        const response = await request(server).put(`/persons/${persID}`).send(updatePersonValues);

        expect(response.body.id).toBe(persID);
        expect(response.body.name).toBe(updatePersonValues.name);
        expect(response.body.hobbies[1]).toBe(updatePersonValues.hobbies[1]);
    });

    test("DELETE: should delete the object with the specified ID and receive a message about successful deletion", () => {
        async function callback() {
            const response = await request(server).delete(`/persons/${persID}`);

            expect(response.statusCode).toBe(204);
        }
        
        callback();
    });

    test("GET: should receive an answer that the person with the specified ID was not found", () => {
        const responseObj = { message: `Person with ID ${persID} not found` };

        async function callback() {
            const response = await request(server).get(`/persons/${persID}`);
            expect(response.body.message).toBe(responseObj.message);
        }
        
        callback(); 
        persID = null;
    });
});

describe('SCENARIO #2. Statuscodes', function() {
    test("Should be 200", async () => {
        const response = await request(server).get('/persons');
        expect(response.statusCode).toBe(200);
    });

    test("Should be 201", async () => {
        const newPerson = {
            "name": "Scenario 2",
            "age": 3000,
            "hobbies": ["to save the world", "dancing"]
        };
        try {
            const response = await request(server).post('/persons').send(newPerson);
            expect(response.statusCode).toBe(201);
        } catch (error) {
            console.log(error);
        }
    });

    test("Should be 404", async () => {
        try {
            const somePerson = data[data.length - 1];
            persID = somePerson.id;
            await request(server).delete(`/persons/${persID}`);
        } catch (error) {
            expect(error).toBe(404);
        }
    });
})

describe("SCENARIO #3. First add three persons, and then remove all", function () {
    test("POST: should write a new person to the data array and get the object of the new person", async () => {
        const newPerson = {
            "name": "Scenario 3",
            "age": 3000,
            "hobbies": ["to save the world", "dancing"]
        };
        const response = await request(server).post('/persons').send(newPerson);

        expect(response.body.id).toBeDefined();
        expect(response.body.name).toBe(newPerson.name);
        expect(response.body.age).toBe(newPerson.age);
        expect(response.body.hobbies).toEqual(newPerson.hobbies);
    });

    test("POST: should write a new person to the data array and get the object of the new person", async () => {
        const newPerson = {
            "name": "Scenario 3",
            "age": 3000,
            "hobbies": ["to save the world", "dancing"]
        };
        const response = await request(server).post('/persons').send(newPerson);

        expect(response.body.id).toBeDefined();
        expect(response.body.name).toBe(newPerson.name);
        expect(response.body.age).toBe(newPerson.age);
        expect(response.body.hobbies).toEqual(newPerson.hobbies);
    });

    test("POST: should write a new person to the data array and get the object of the new person", async () => {
        const newPerson = {
            "name": "Scenario 3",
            "age": 3000,
            "hobbies": ["to save the world", "dancing"]
        };
        const response = await request(server).post('/persons').send(newPerson);

        expect(response.body.id).toBeDefined();
        expect(response.body.name).toBe(newPerson.name);
        expect(response.body.age).toBe(newPerson.age);
        expect(response.body.hobbies).toEqual(newPerson.hobbies);
    });

    test("DELETE: Should remove all persons from the array", async () => {
        async function callback() {
            const data = await request(server).get('/persons');
            data.body.forEach(async (pers, i, arr) => {
                await request(server).delete(`/persons/${pers.id}`);
                if(arr.length === 1) {
                    const res = await request(server).get('/persons');
                    expect(res.body.length).toBe(0);
                }
            });
        }
        
        callback();
    });
});