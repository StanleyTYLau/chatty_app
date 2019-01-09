import React, {Component} from 'react';

export default class ChatBar extends Component {
  constructor() {
      super();

      this.state = {
        term: ''
      };

  }

  render(){
    return(
      <footer className="chatbar">
          <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser} />
          <input
            className="chatbar-message"
            placeholder="Type a message and hit ENTER"
            value={this.state.term}
            onChange={this._updateTerm}
            onKeyDown={this._handleEnter}
          />
      </footer>
    );
  }

  //update the term state as the user types in a message.
  _updateTerm = (e) => {
    this.setState({ term: e.target.value });
  }

  //handle sending data up when enter pressed.
  _handleEnter = (e) => {
    if (e.keyCode == 13){
      this.props.addMessage(this.state.term);
      this.setState({ term: "" });
    }

  };
}
