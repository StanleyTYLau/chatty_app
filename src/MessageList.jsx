import React, {Component} from 'react';
import Message from './Message.jsx';

export default class MessageList extends Component {
  render(){
    const arr = this.props.messages;
    const messageItems = arr.map( (message) =>
      <Message content={message.content} username={message.username}/>
    );

    return(
      <main className="messages">
        {messageItems}
      </main>
    );
  }
}