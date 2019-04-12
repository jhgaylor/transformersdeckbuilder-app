import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Mutation } from "react-apollo";
import { TTCGMutations, TTCGUpdaters} from '../../../api/graphql.js'

export default class LogoutPage extends Component {
  async componentDidMount() {
    this.mutate()
  }

  render() {
    let self = this;
    return (
      <Mutation mutation={TTCGMutations.LOGOUT} update={TTCGUpdaters.logout}>
        {(mutate, { client, data, loading, called }) => {
          if (called && ! loading) {
            // NOTE: idk why i dont need to do it here but did in meteor
            // client.resetStore()
            return (
              <div>
                <Redirect to="/" />
              </div>
            )
          }
          self.mutate = mutate
          return null
        }}
      </Mutation>
    )
  }
}
