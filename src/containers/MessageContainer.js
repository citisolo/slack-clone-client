import React, { Component } from 'react';
import Messages from '../components/Messages';
import { graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import { Comment } from 'semantic-ui-react'

//import paramCase = require('param-case');


const newChannelMessageSubscription = gql`
  subscription($channelId: Int!) {
    newChannelMessage(channelId: $channelId){
        id
        text
        user {
          username
        }
        created_at
    }
  }
`;

class MessageContainer extends Component {

  componentWillMount() {
    this.unsubscribe = this.subscribe(this.props.channelId);
  }

  componentWillReceiveProps({ channelId, client }) {
    console.log(client);
    // client.query({
    //   query: gql`
    //   query ($channelId: Int!) {
    //     messages(channelId: $channelId) {
    //       id
    //       text
    //       user {
    //         username
    //       }
    //       created_at
    //     }
    //   }`,
    //   variables: {
    //     channelId,
    //   }
    // }).then((d) => {
    //   console.log(d);
    //   console.log(`showing channel: ${channelId}`);
    //   if (this.props.channelId !== channelId) {
    //     if (this.unsubscribe) this.unsubscribe();
    //     this.unsubscribe = this.subscribe(channelId);
    //   }
    // });
    if (this.props.channelId !== channelId) {
      if (this.unsubscribe) this.unsubscribe();
      this.unsubscribe = this.subscribe(channelId);
    }


  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }


  subscribe = channelId =>
    this.props.data.subscribeToMore({
      document: newChannelMessageSubscription,
      variables: {
        channelId,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) {
          return prev;
        }
        console.log(subscriptionData);
        return {
          ...prev,
          messages: [...prev.messages, subscriptionData.data.newChannelMessage],
        };
      },
    });


  render() {
    const { data: { loading, messages } } = this.props;
    return (loading ? null : (
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
  }
}

const messagesQuery = gql`
  query ($channelId: Int!) {
    messages(channelId: $channelId) {
      id
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
  options: {
    fetchPolicy: 'network-only',
  },
})(MessageContainer);

