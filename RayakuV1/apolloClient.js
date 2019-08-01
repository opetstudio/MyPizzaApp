import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';

import { getConf } from './conf';

const conf = getConf('rayaku-graphql');
const host = conf.host;
const url = `${host}/graphql/index`;
console.log('[apolloClient] endpoint url=', url);
const httpLink = new HttpLink({ uri: url });

const logoutLink = onError(({
  graphQLErrors, networkError, response, operation
}) => {
    console.log('networkError', networkError);
    console.log('operation', operation);
    console.log('response', response);
    if (graphQLErrors) graphQLErrors.map(({ message, locations, path }) => console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`));
    // if (networkError.statusCode === 401){
    // };
    // if (operation.operationName === "IgnoreErrorsQuery") {
        // response.errors = null;
    // }
  });

const client = new ApolloClient({
   link: logoutLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default client;
