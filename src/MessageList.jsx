import React, {Component} from 'react';
import Message from './Message.jsx';

const MessageList = ({messages}) => {
  const arr = messages;
  const messageItems = arr.map( (message) =>
    <Message key={message.id} content={message.content} username={message.username}/>
  );

  return(
    <main className="messages">
      {messageItems}
    </main>
  );

};

// class MessageList extends Component {
//   render(){
//     const arr = this.props.messages;
//     const messageItems = arr.map( (message) =>
//       <Message key={message.id} content={message.content} username={message.username}/>
//     );

//     return(
//       <main className="messages">
//         {messageItems}
//       </main>
//     );
//   }
// }
export default MessageList;