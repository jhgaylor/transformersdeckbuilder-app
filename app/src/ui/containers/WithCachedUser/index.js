import React from 'react';
import { TTCGQueries } from '../../../api/graphql.js';
import { Query } from "react-apollo";

export default function WithCachedUser(props) {
  let query = TTCGQueries.WHOAMI
  return (
    <Query query={query} fetchPolicy="cache-only">
      {RenderWithCachedApolloUserData(props)}
    </Query>
  )
}
function RenderWithCachedApolloUserData({children}) {
  return ({ loading, error, data, refetch }) => {
    // console.log("WithCachedUser", loading, data, children)
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