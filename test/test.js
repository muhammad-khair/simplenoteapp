const { createNewNote } = require("../src/noteService");
let app = require("../index");
let chai = require('chai');
let chaiHttp = require('chai-http');
let Note = require("../src/noteModel");

chai.use(chaiHttp);
chai.should();

describe("api/note", () => {
    describe("GET", () => {
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

        let note = createNewNote({ description: "Test code" });
        note.save();
        let getId = note._id;
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

        it("should not get single note by invalid id", (done) => {
            const invalidId = 0;
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

        after(() => {
            console.log(`Deleting id ${getId} from test`);
            Note.findByIdAndDelete(getId, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        });
    });
    
    describe("POST", () => {
        var postId = 0;
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
        it("should be able to view new note", (done) => {
            chai.request(app)
                .get(`/api/note/${postId}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('data');
                    done();
                });
        });

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

        after(() => {
            console.log(`Deleting id ${postId} from test`);
            Note.findByIdAndDelete(postId, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        });
    });

    describe("PUT", () => {
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
        it("should be able to view note with changes", (done) => {
            chai.request(app)
                .get(`/api/note/${putId}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('data');
                    res.body.data.description.should.be.a('string').eql(newDesc);
                    done();
                });
        });
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
        it("should be able to view note as of previous state", (done) => {
            chai.request(app)
                .get(`/api/note/${putId}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('data');
                    res.body.data.description.should.be.a('string').eql(newDesc);
                    done();
                });
        });

        after(() => {
            console.log(`Deleting id ${putId} from test`);
            Note.findByIdAndDelete(putId, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        });
    });    

    describe("DELETE", () => {
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

        after(() => {
            console.log(`Deleting id ${deleteId} from test`);
            Note.findByIdAndDelete(deleteId, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        });
    });
});
