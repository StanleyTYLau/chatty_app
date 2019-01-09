import React, {Component} from 'react';

export default class ChatBar extends Component {
  constructor() {
      super();

      this.state = {
        term: '',
        username: ''
      };

  }

  render(){
    return(
      <footer className="chatbar">
          <input
            className="chatbar-username"
            placeholder="Your Name (Optional)"
            value={this.state.username}
            onChange={this._updateState('username')}
            onKeyDown={this._handleEnter('username')}
            onBlur={this._handleBlurName}
          />
          <input
            className="chatbar-message"
            placeholder="Type a message and hit ENTER"
            value={this.state.term}
            onChange={this._updateState('term')}
            onKeyDown={this._handleEnter('message')}
            ref = 'message'
          />
      </footer>
    );
  }

  //update the state as the user types in a message or username.
  _updateState = key => e => {
      this.setState({ [key]: e.target.value });
  };

  //Send username or message when enter is pressed.
  _handleEnter = key => e => {
    if (e.keyCode == 13){
      switch (key){
        case 'username':
          this.props.addName(this.state.username);
          this.refs['message'].focus(); //move to the message input when name entered.
          break;
        case 'message':
          this.props.addMessage(this.state.term);
          this.setState({ term: "" });
          break;
        default:
      }
    }
  };

  _handleBlurName = () => {
    this.props.addName(this.state.username);
    console.log("focus name");
  };
}
