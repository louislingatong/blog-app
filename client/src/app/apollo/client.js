import {ApolloClient, ApolloLink, from, split, HttpLink, InMemoryCache} from '@apollo/client';
import {onError} from '@apollo/client/link/error';
import {WebSocketLink} from '@apollo/client/link/ws';
import {SubscriptionClient} from 'subscriptions-transport-ws';
import {getMainDefinition} from '@apollo/client/utilities';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = localStorage.getItem('auth_token');

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token ? token : ''
    }
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});

const wsLink = new WebSocketLink(
  new SubscriptionClient('ws://localhost:4000/', {
    reconnect: true
  })
);

const httpLink = new HttpLink({uri: 'http://localhost:4000/'});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const link = from([
  errorLink,
  authLink,
  splitLink
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
});

export default client;