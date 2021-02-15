const {ApolloServer, PubSub} = require('apollo-server');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const {createStore} = require('./store');
const PostAPI = require('./datasoures/post');
const UserAPI = require('./datasoures/user');

const store = createStore();

const dataSources = () => ({
  postAPI: new PostAPI({ store }),
  userAPI: new UserAPI({ store })
});

const context = async ({req}) => {
  const token = (req.headers && req.headers.authorization) || '';

  const result = await store.users.findOne({ where: { token } });
  const user = result ? result.dataValues : null;

  return { user, pubsub };
};

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: { path: '/' },
  dataSources,
  context,
});

server.listen().then(({ url, subscriptionsUrl  }) => {
  console.log(`🚀 Server ready at ${url}`);
  console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
});
