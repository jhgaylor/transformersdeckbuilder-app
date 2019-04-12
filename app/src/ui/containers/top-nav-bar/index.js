import React from 'react';
import TopNavBar from '../../components/top-nav-bar/index.js';
import WithCachedUser from '../WithCachedUser/index.js'

export default function ComposeNavBar(props) {
  return (
    <WithCachedUser>
      <TopNavBar />
    </WithCachedUser>
  )
}
