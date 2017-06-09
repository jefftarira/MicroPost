import React, { Component } from 'react';
import './Post.css';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
    };
  }

  render() {
    return (
      <div className="post">
        <span>{this.state.data.message}</span>
      </div>   
    );
  }
}

export default Post;
