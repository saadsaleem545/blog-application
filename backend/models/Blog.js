const Datastore = require('nedb-promises');
const Blog = Datastore.create({ filename: './blogs.db', autoload: true });
module.exports = Blog;