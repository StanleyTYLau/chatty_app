import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import "../styles/application.scss"

class App extends Component {
  constructor(){
    super();
    this.state = {
      currentUser:"TestUser",
      messages:[
        {
          type: "incomingMessage",
          content: "I won't be impressed with technology until I can download food.",
          username: "Anonymous1"
        },
        {
          type: "incomingMessage",
          content: "I enjoy free food.",
          username: "SuperMan"
        }
      ]
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({loading: false}); // this triggers a re-render!
    }, 1000)
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} />
      </div>
    );
  }
}
export default App;
