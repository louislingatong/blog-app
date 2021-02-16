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

const context = async (context) => {
  let token;
  if (context.req) {
    token = (context.req.headers && context.req.headers.authorization) || '';
  } else {
    token = (context.headers && context.headers.authorization) || '';
  }
  const result = await store.users.findOne({ where: { token } });
  const user = result ? result.dataValues : null;

  return { user, pubsub };
};

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: {
    path: '/',
    onConnect: (connectionParams, webSocket, { request }) => {
      console.log('Client connected');
    },
    onDisconnect: (webSocket, context) => {
      console.log('Client disconnected')
    },
  },
  dataSources,
  context,
});

server.listen().then(({ url, subscriptionsUrl  }) => {
  console.log(`🚀 Server ready at ${url}`);
  console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
});
