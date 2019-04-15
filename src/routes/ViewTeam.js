import React from 'react';


import Messages from '../components/Messages';
import SendMessage from '../components/SendMessage';
import Header from '../components/Header';
import AppLayout from '../components/AppLayout';
import Sidebar from '../containers/Sidebar';


const ViewTeam = ({ match: { params } }) => (
  <AppLayout>
    <Sidebar currentTeamId={params.teamId} />
    <Header channelName="general" />
    <Messages>
      <ul className="message-list">
        <li></li>
        <li></li>
      </ul>
    </Messages>
    <SendMessage channelName="general" />
  </AppLayout>
);

export default ViewTeam;
