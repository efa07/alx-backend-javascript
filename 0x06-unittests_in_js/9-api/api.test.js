const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./api');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Cart Page Test', () => {
    it('should return payment methods for a valid cart ID', (done) => {
        chai.request(server)
            .get('/cart/12')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equal('Payment methods for cart 12');
                done();
            });
    });

    it('should return 404 for an invalid cart ID', (done) => {
        chai.request(server)
            .get('/cart/hello')
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.text).to.contain('Invalid cart ID');
                done();
            });
    });
});
