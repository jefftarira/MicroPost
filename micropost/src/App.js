import React, { Component } from 'react';
import Button from 'muicss/lib/react/button';
import Form from 'muicss/lib/react/form';
import Textarea from 'muicss/lib/react/textarea';
import Input from 'muicss/lib/react/input';
import Post from './Post';
import './App.css';
import logo from './logo.svg';

class App extends Component {

  constructor() {
    super();
    this.state = {
      user: '',
      posts: [],
      message: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
    fetch('http://LB-micro-post-1475621456.us-east-1.elb.amazonaws.com:8080/post/list')
      .then((response) => response.json())
      .then((response) => {
        this.setState({ posts: response.posts });
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
      user: this.state.user,
      message: this.state.message,
    };
    fetch('http://LB-micro-post-1475621456.us-east-1.elb.amazonaws.com:8080/post/list', {
      method: 'POST',
      body: JSON.stringify(param),
    }).then(res => res.json())
      .then(res => {
        console.log(res);
        if (!res.error) {
          fetch('http://LB-micro-post-1475621456.us-east-1.elb.amazonaws.com:8080/post/list')
            .then((response) => response.json())
            .then((response) => {
              this.setState({
                posts: [],
              });
              this.setState({
                posts: response.posts,
                user: '',
                message: '',
              });
            });
        }
      });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div className="App-logo-name">
            <img src={logo} alt="" className="App-logo" />
            <h2>MicroPost!</h2>
          </div>
        </div>
        <div className="App-intro">
          <div className="Card-container">
            <div className="post">
              <div className="App-button">
                <Form className="form" onSubmit={this.handleSubmit} >
                  <legend>Publicar post</legend>
                  <Input
                    label="Nombre"
                    name="user"
                    floatingLabel
                    value={this.state.user}
                    onChange={this.handleInputChange}
                    required
                  />
                  <Textarea
                    hint="Escribe aqui"
                    name="message"
                    value={this.state.message}
                    onChange={this.handleInputChange}
                    required
                  />
                  <Button type="submit" color="danger" size="small">Publicar</Button>
                </Form>
              </div>
            </div>

            {
              this.state.posts.map((obj, i) => (
                <Post data={obj} key={i} />
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
