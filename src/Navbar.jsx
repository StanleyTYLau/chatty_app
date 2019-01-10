import React, {Component} from 'react';

class Navbar extends Component {
  render(){
    return(
      <nav className="navbar">
        <a href="/" className="navbar-brand"><i className="far fa-comment-alt"></i> Chatty</a>
        <span className="navbar-userCount">{this.props.numUser} users online</span>
      </nav>
    );
  }
}

export default Navbar;