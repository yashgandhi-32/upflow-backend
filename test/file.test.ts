
//Require the dev-dependencies
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../src/server";

chai.use(chaiHttp);
//Our parent block
describe('File', () => {
    /*
      * Test the /GET route
      */
    describe('/POST file', () => {
        it('it should return success', (done) => {
            chai.request(server)
                .post('/v1/file/upload-file')
                .send({ fileUrl: "http://www.africau.edu/images/default/sample.pdf" })
                .end((err, res) => {
                    expect(res.body).to.contain({ 'success': true });
                    done();
                });
        });
    })

    describe('/POST file', () => {
        it("return error fileUrl missing", (done) => {
            chai.request(server)
                .post('/v1/file/upload-file')
                .end((err, res) => {
                    expect(res.body).to.have.property("errors")
                    done()
                });
        });
    })

    describe('/GET file', () => {
        it('list all the files', (done) => {
            chai.request(server)
                .get('/v1/file/get-files')
                .end((err, res) => {
                    expect(res.body).to.contain({ 'success': true });
                    done();
                });
        });
    });
});