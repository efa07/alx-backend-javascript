const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./api');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Payment Methods Test', () => {
    it('should return available payment methods', (done) => {
        chai.request(server)
            .get('/available_payments')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.deep.equal({
                    payment_methods: {
                        credit_cards: true,
                        paypal: false
                    }
                });
                done();
            });
    });
});

describe('Login Test', () => {
    it('should return welcome message for valid username', (done) => {
        chai.request(server)
            .post('/login')
            .send({ userName: 'Betty' })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equal('Welcome Betty');
                done();
            });
    });

    it('should return 400 when username is not provided', (done) => {
        chai.request(server)
            .post('/login')
            .send({})
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.text).to.equal('Username is required');
                done();
            });
    });
});
