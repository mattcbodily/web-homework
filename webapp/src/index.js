import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './routes'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import { client } from './network/apollo-client'
import { Provider } from 'react-redux'
import store from './redux/store'

ReactDOM.render(
  (
    <div data-app-init=''>
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          <Provider store={store}>
            <AppRouter />
          </Provider>
        </ApolloHooksProvider>
      </ApolloProvider>
    </div>
  ),
  document.getElementById('react-app')
)
