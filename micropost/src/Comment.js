import React, { Component } from 'react';
import Moment from 'react-moment';

import avatar from './img/avatar5.png';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
    };
  }

  render() {
    return (
      <div className="comment-comments">
        <img className="avatar" src={avatar} />
        <div className="content-comment">
          <div className="user-comment">
            <div className="username">{this.state.data.user}</div>
            <div className="date">
              <Moment fromNow ago>{this.state.data.date}</Moment>
            </div>
          </div>
          <div className="message-comment">
            {this.state.data.message}
          </div>
        </div>
      </div>
    );
  }
}

export default Comment;
