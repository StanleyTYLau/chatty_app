import React, {Component} from 'react';

const Message = ({username, content, type, fontColour}) => {

  if (type === 'post-message') {
    return(
      <div className="message">
        <span className="message-username" style={{color:fontColour}}>{username}</span>
        <span className="message-content">{content}</span>
      </div>
    );
  }
  else if (type === 'post-notification') {
    return(
      <div className="notification">
        <span className="notification-content">{content}</span>
      </div>
    );
  }



};

// class Message extends Component {
//   render(){

//     return(
//       <div className="message">
//         <span className="message-username">{this.props.username}</span>
//         <span className="message-content">{this.props.content}</span>
//       </div>
//     );
//   }
// }
export default Message;