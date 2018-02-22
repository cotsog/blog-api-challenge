const chai = require('chai');
const chaiHttp = require ('chai-http');
const {app, closeServer, runServer} = require('../server');
const expect = chai.expect;
chai.use(chai.Http);

let server;

function runServer() {
    const port = process.env.PORT || 8080;
    return new Promie((resolve, reject) => {
        server = app.listen(port, () => {
            console.log(`Your app is listening on port ${port}`);
            resolve(server);
        })
        .on('error', err => {
            reject(err);
        });
    });
}
if (require.main === module) {
    runServer().catch(err => console.error(err));
};