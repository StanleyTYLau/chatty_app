import React, {Component} from 'react';

const Message = ({username, content, type, fontColour}) => {

  let matches = content.match(/(.*)(https?[^\s]*\.(jpg|png|gif))(.*)/);

  if (type === 'post-message' && matches){
    return(
      <div className="message">
        <span className="message-username" style={{color:fontColour}}>{username}</span>
        <div className="image-container">
          {matches[1]}<img className="message-content image" src={matches[2]} />{matches[4]}
        </div>

      </div>
    );
  }
  else if (type === 'post-message') {
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