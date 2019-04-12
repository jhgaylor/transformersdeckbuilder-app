import React from 'react';
import WithCachedUser from '../WithCachedUser/index.js'

import AccountsPage from '../../components/accounts-page/index.js';

export default function ComposeLoginPage(props){
  return (
    <WithCachedUser>
      <AccountsPage {...props} />
    </WithCachedUser>
  )
}
