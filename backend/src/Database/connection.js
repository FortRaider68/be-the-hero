const Knex = require('knex');
const KnexFile = require('../../knexfile');

const connection = Knex(KnexFile.development);

module.exports = connection; 