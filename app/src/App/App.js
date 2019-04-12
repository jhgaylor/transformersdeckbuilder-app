import React, { Component } from 'react';
import { ApolloProvider } from "react-apollo";
import ApolloClient from 'apollo-boost';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import WithUser from '../ui/containers/WithUser/index.js';
import DeckEditerPage from '../ui/containers/deck-editor-page/index.js'
import Home from '../ui/containers/home-page/index.js'
import TopNavBar from '../ui/containers/top-nav-bar/index.js';
import DeckListPage from '../ui/containers/deck-list-page/index.js'
import MyDeckListPage from '../ui/containers/my-deck-list-page/index.js'
import AccountsPage from '../ui/containers/accounts-page/index.js'
import LogoutPage from '../ui/components/logout-page/index.js'
import FlashMessages from '../ui/containers/flash-messages/index.js';
import NoMatch from '../ui/components/no-match/index.js';


// some config from the old app in case we want it
// Accounts.ui.config({
//   passwordSignupFields: 'EMAIL_ONLY',
//   loginPath: '/login',
//   signUpPath: '/signup',
//   resetPasswordPath: '/reset-password',
//   profilePath: '/decks',
//   minimumPasswordLength: 6
// });

// TODO: uri should be parameterizable at run time
const client = new ApolloClient({
  uri: 'https://api.transformersdeckbuilder.com/graphql',
  credentials: 'include'
})

export default class App extends Component {
  constructor(props) {
    super(props);
    this.apolloClient = client
  }

  render() {

    return (
      <ApolloProvider client={this.apolloClient}>
        <WithUser />
        <BrowserRouter>
          <div className="app-container bg-dark text-light">
            <TopNavBar />
            <div className="content">
              <FlashMessages />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={() => <AccountsPage />} />
                <Route path="/signup" component={() => <AccountsPage signupMode={true} />} />
                <Route exact path="/logout" component={LogoutPage} />
                <Route exact path="/decks/" component={DeckListPage} />
                <Route exact path="/decks/mine" component={MyDeckListPage} />
                <Route path="/decks/:id" component={DeckEditerPage} />
                <Route component={NoMatch}/>
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </ApolloProvider>
    )
  }
}
