const server = import('../dist/pipe-web/server/server.mjs');

module.exports = server.app;

// export default import('../dist/pipe-web/server/server.mjs')
//   .then(module => module.app());