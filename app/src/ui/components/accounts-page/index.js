import React, {Component} from 'react';
import { Redirect } from 'react-router';
import { Mutation } from "react-apollo";
import { TTCGMutations, TTCGUpdaters } from '../../../api/graphql.js';

class Login extends Component {

  constructor(props) {
    super(props);
    this.makeLoginHandler = this.makeLoginHandler.bind(this)
  }

  makeLoginHandler(mutate) {
    return (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      // console.log("login details", email, password)
      mutate({
        variables: {
          email: email.value,
          password: password.value,
        },  
      });
    }
  }

  render() {
    return (
      <Mutation mutation={TTCGMutations.LOGIN} update={TTCGUpdaters.updateCacheWithLoginUser}>
        {mutate => (
          <div>
            <h1>Login</h1>
            <form onSubmit={this.makeLoginHandler(mutate)}>
              <label>
                Email
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                />
              </label>
              <label>
                Password
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                />
              </label>
              <button type="submit">Sign Up</button>
            </form>
          </div>
        )}
      </Mutation>
    )

  }
}

class Signup extends Component {

  constructor(props) {
    super(props);
    this.makeRegisterHandler = this.makeRegisterHandler.bind(this)
  }

  makeRegisterHandler(mutate) {
    return (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      mutate({
        variables: {
          email: email.value,
          password: password.value,
        },  
      });
    }
  }

  render() {
    return (
      <Mutation mutation={TTCGMutations.REGISTER} update={TTCGUpdaters.updateCacheWithRegisterUser}>
        {mutate => (
          <div>
            <h1>Sign up</h1>
            <form onSubmit={this.makeRegisterHandler(mutate)}>
              <label>
                Email
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                />
              </label>
              <label>
                Password
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                />
              </label>
              <button type="submit">Sign Up</button>
            </form>
          </div>
        )}
      </Mutation>
    )
  }
}

export default class AccountsPage extends Component {
  render() {
    let {signupMode, user} = this.props;
    const amLoggedIn = (user && user.email && user.email !== "");
    console.log("amLoggedIn", amLoggedIn)
    console.log("login page props", this.props)
    
    return (
      <div className="container login-container">
        <div className="row">
          <div className="col"></div>
          <div className="col">
          {
            amLoggedIn ? 
            <span><Redirect to="/decks" />Redirecting</span>
            : null
          }
          {
            ! amLoggedIn && signupMode ?
            <Signup /> : <Login />
          }
          </div>
          <div className="col"></div>
        </div>
      </div>
    )
  }
}

