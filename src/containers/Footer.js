import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Logo from '../images/warbler-logo.png';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render(){
    return(
      <footer className="mdl-mini-footer">
        <div className="mdl-mini-footer__left-section">
          <div className="mdl-logo">Warbler</div>
          <ul className="mdl-mini-footer__link-list">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/support">Help</Link></li>
            <li><Link to="/privacy-tos">Privacy & Terms</Link></li>            
          </ul>
        </div>
      </footer>
    )
  }

}

export default Footer;
