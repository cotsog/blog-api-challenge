const chai = require('chai');
const chaiHttp = require('chai-http');
const {app, closeServer, runServer} = require('../server');
const expect = chai.expect;
chai.use(chaiHttp);

describe('blogPosts', function() {
    before(function() {
        return runServer();
    });
    after(function() {
        return closeServer();
    });
    it('should return a blog post on GET', function() {
        return chai.request(app)
        .get('/blog-posts')
        .then(function(res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.a('array');
            expect(res.body.length).to.be.above(0);
            const expectKeys = ['id', 'title', 'content', 'author', 'publishDate'];
            res.body.forEach(function(item) {
                expect(item).to.be.a('object');
                expect(item).to.include.keys(expectKeys);
            });
        });
    });
})

// let server;

// function runServer() {
//     const port = process.env.PORT || 8080;
//     return new Promie((resolve, reject) => {
//         server = app.listen(port, () => {
//             console.log(`Your app is listening on port ${port}`);
//             resolve(server);
//         })
//         .on('error', err => {
//             reject(err);
//         });
//     });
// }
// if (require.main === module) {
//     runServer().catch(err => console.error(err));
// };