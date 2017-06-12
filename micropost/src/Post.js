import React, { Component } from 'react';
import Button from 'muicss/lib/react/button';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Comment from './Comment';
import './Post.css';
import avatar from './img/avatar04.png';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      comments: [],
      total: 0,
      user: '',
      comment: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadComments = this.loadComments.bind(this);
  }

  componentWillMount() {
    this.loadComments();
  }

  loadComments() {
    fetch(`http://LB-micro-comment-1884902263.us-east-1.elb.amazonaws.com:8080/comments/list?idPost=${this.state.data.id}`)
      .then((response) => response.json())
      .then((response) => {
        this.setState({ comments: response.comments, total: response.total });
      });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const param = {
      idPost: this.state.data.id,
      user: this.state.user,
      message: this.state.comment,
    };
    fetch('http://LB-micro-comment-1884902263.us-east-1.elb.amazonaws.com:8080/comments/list', {
      method: 'POST',
      body: JSON.stringify(param),
    }).then(res => res.json())
      .then(res => {
        console.log(res);
        if (!res.error) {
          fetch(`http://LB-micro-comment-1884902263.us-east-1.elb.amazonaws.com:8080/comments/list?idPost=${this.state.data.id}`)
            .then((response) => response.json())
            .then((response) => {
              console.log(response.comments);
              this.setState({
                comments: [],
              });
              this.setState({
                comments: response.comments,
                total: response.total,
                comment: '',
              });
            });
        }
      });
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

        <div className="content-message">
          <div className="post-message">
            {this.state.data.message}
          </div>
        </div>

        <div className="content-comments">
          <div className="total-comments">{this.state.total} comentarios</div>

          {
            this.state.comments.map((obj, i) => (
              <Comment data={obj} key={i} />
            ))
          }

          <div>
            <Form onSubmit={this.handleSubmit}>
              <Input
                label="Nombre"
                name="user"
                floatingLabel
                value={this.state.user}
                onChange={this.handleInputChange}
                required
              />
              <Input
                hint="Comentar..."
                name="comment"
                value={this.state.comment}
                onChange={this.handleInputChange}
                required
              />
              <Button type="submit" color="primary" size="small" >Agregar</Button>
            </Form>
          </div>
        </div>

      </div>
    );
  }
}

export default Post;
