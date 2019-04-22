import React, { Component } from 'react';
import Messages from '../components/Messages';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const MessageContainer = ({ data: { loading, messages } }) => (loading ? null : (
  <Messages>
    {JSON.stringify(messages)}
  </Messages>
));

const messagesQuery = gql`
  query ($channelId: Int!) {
    messages(channelId: $channelId) {
      text
      user {
        username
      }
      createdAt
    }
  }
`;

export default graphql(messagesQuery, {
  variables: props => ({
    channelId: props.channelId,
  }),
})(MessageContainer);

