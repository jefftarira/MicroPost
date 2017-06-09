import React, { Component } from 'react';
import './Post.css';
import avatar from './a7.jpg';

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
        <div className="App-cad-image">
          <div className="App-card-footer">
            <img className="App-card-avatar" src={avatar} />
            <span>{this.state.data.user}</span>
          </div>
        </div>
        <span>{this.state.data.message}</span>
      </div>   
    );
  }
}

export default Post;
