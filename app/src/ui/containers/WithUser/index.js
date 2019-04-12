import React from 'react';
import { TTCGQueries } from '../../../api/graphql.js';
import { Query } from "react-apollo";

export default function WithUser(props) {
  let query = TTCGQueries.WHOAMI
  return (
    <Query query={query}>
      {RenderWithApolloData(props)}
    </Query>
  )
}

function RenderWithApolloData({children}) {
  return ({ loading, error, data, refetch }) => {
    console.log("WithUser", loading, data, children)
    if (children === null || children === undefined) {
      return null
    }
    const user = data.whoAmI;
    const childrenWithExtraProp = React.Children.map(children, child => {
      return React.cloneElement(child, {
        user,
        userLoading: loading,
        userError: error,
      });
    });
    return (
      childrenWithExtraProp
    )
  }
}
