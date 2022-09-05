const { createNewNote } = require("../src/noteService");
let app = require("../index");
let chai = require('chai');
let chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

describe("api/note", () => {

    describe("GET api/note", () => {
        it("should get all notes", (done) => {
            chai.request(app)
                .get("/api/note")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('data');
                    res.body.data.should.be.a('array');
                    done();
                });
        });
    });

    describe("GET api/note/:validId", () => {
        let note = createNewNote({ description: "Test code" });
        let getId = note._id;
        note.save();

        it("should be able to view specific note", (done) => {
            chai.request(app)
                .get(`/api/note/${getId}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('data');
                    done();
                });
        });
    });

    describe("GET api/note/:invalidId", () => {
        it("should not get single note by invalid id", (done) => {
            const invalidId = 123456789;
            chai.request(app)
                .get(`/api/note/${invalidId}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message')
                        .eql('Note does not exist.');
                    done();
                });
        });
    });
    
    describe("POST api/note with valid body", () => {
        let postId = 123456789;
        it("should accept a new note with correct format", (done) => {
            let note = {
                description: "Test code",
            };
            chai.request(app)
                .post("/api/note")
                .send(note)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('data');
                    res.body.data.should.be.a('object');
                    postId = res.body.data._id;
                    done();
                });
        });
    });

    describe("POST api/note with invalid body", () => {
        it("should not add a new note for incorrect format", (done) => {
            let note = {
                description: "Test code",
                priority: "FAKE"
            };
            chai.request(app)
            .post("/api/note")
            .send(note)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.be.a('array');
                    done();
                });
        });
    });

    describe("PUT /api/note/:id with valid body", () => {
        let oldDesc = "Test code";
        let newDesc = "Delete code";
        let note = createNewNote({ description: oldDesc });
        note.save();
        let putId = note._id;
        it("should be able to update note with correct format", (done) => {
            let note = {
                description: newDesc,
            };
            chai.request(app)
                .put(`/api/note/${putId}`)
                .send(note)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });  

    describe("PUT /api/note/:id with invalid body", () => {
        let oldDesc = "Test code";
        let note = createNewNote({ description: oldDesc });
        note.save();
        let putId = note._id;
        it("should not be able to update note with incorrect format", (done) => {
            let note = {
                priority: 123,
            };
            chai.request(app)
                .put(`/api/note/${putId}`)
                .send(note)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.be.a('array');
                    done();
                });
        });
    });    

    describe("DELETE /api/note/:validId", () => {
        let note = createNewNote({ description: "to delete" });
        note.save();
        let deleteId = note._id;
        it("should be able to remove note", (done) => {
            chai.request(app)
                .delete(`/api/note/${deleteId}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('note_id').eql(`${deleteId}`);
                    done();
                });
        });
    });

    describe("DELETE /api/note/:invalidId", () => {
        let deleteId = 123456789;
        it("should not be able to view deleted note by invalid id", (done) => {
            chai.request(app)
                .get(`/api/note/${deleteId}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message')
                        .eql('Note does not exist.');
                    done();
                });
        });
    });
});
