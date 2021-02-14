import {ApolloClient, ApolloLink, from, HttpLink, InMemoryCache} from '@apollo/client';
import {onError} from '@apollo/client/link/error';

const errorLink = onError(({graphqlErrors, networkError}) => {
  if (graphqlErrors) {
    graphqlErrors.map(({message, location, path}) => {
      console.log(`Graphql error ${message}`);
    })
  }

  if (networkError) {
    console.log(`Network error ${networkError}`);
  }
});

const httpLink = from([
  errorLink,
  new HttpLink({uri: 'http://localhost:4000/'})
]);

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

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
});

export default client;