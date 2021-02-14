const { ApolloServer } = require('apollo-server');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { createStore } = require('./store');
const PostAPI = require('./datasoures/post');
const UserAPI = require('./datasoures/user');

const store = createStore();

const dataSources = () => ({
  postAPI: new PostAPI({ store }),
  userAPI: new UserAPI({ store })
});

const context = async ({ req }) => {
  const token = (req.headers && req.headers.authorization) || '';

  const result = await store.users.findOne({ where: { token } });
  const user = result ? result.dataValues : null;

  return { user };
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
