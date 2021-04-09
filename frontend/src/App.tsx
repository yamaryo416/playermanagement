import './App.css';

import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';

import theme from './theme/theme';
import { Router } from './router/Router';
import { RecoilRoot } from 'recoil';

const httpLink = createHttpLink({
  uri: "http://0.0.0.0:8000/graphql/",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token")
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

const App = () => {
  console.log("app")
  return (
    <ApolloProvider client={client}>
      <RecoilRoot>
        <ChakraProvider theme={theme}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </ChakraProvider>
      </RecoilRoot>
    </ApolloProvider>
  );
}

export default App;
