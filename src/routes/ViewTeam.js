import React from 'react';

import Channels from '../components/Channels';
import Teams from '../components/Teams';
import Messages from '../components/Messages';
import Input from '../components/Input';
import Header from '../components/Header';
import AppLayout from '../components/AppLayout';


export default () => (
  <AppLayout>
    <Teams>Teams</Teams>
    <Channels>Channels</Channels>
    <Header>Header</Header>
    <Messages>
      <ul className="message-list">
        <li></li>
        <li></li>
      </ul>
    </Messages>
    <Input>
      <input type="text" placeholder="CSS Grid Layout Module" />
    </Input>
  </AppLayout>
);
