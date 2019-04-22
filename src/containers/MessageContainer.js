import React, { Component } from 'react';
import Messages from '../components/Messages';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { Comment } from 'semantic-ui-react'

const MessageContainer = ({ data: { loading, messages } }) => (loading ? null : (
  <Messages>
    <Comment.Group>
      {messages.map(m => (
        <Comment key={`${m.id}-message`}>
          <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
          <Comment.Content>
            <Comment.Author as='a'>{m.user.username}</Comment.Author>
            <Comment.Metadata>
              <div>Today at {m.created_at}</div>
            </Comment.Metadata>
            <Comment.Text>{m.text}</Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      ))}
    </Comment.Group>
  </Messages>
));

const messagesQuery = gql`
  query ($channelId: Int!) {
    messages(channelId: $channelId) {
      text
      user {
        username
      }
      created_at
    }
  }
`;

export default graphql(messagesQuery, {
  variables: props => ({
    channelId: props.channelId,
  }),
})(MessageContainer);

