import React, { Component } from 'react';
import Button from 'muicss/lib/react/button';
import Form from 'muicss/lib/react/form';
import Textarea from 'muicss/lib/react/textarea';
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
  }

  componentWillMount() {
    fetch('http://LB-micro-post-1475621456.us-east-1.elb.amazonaws.com:8080/post/list')
      .then((response) => response.json())
      .then((response) => {
        this.setState({ posts: response.posts });
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
                <Form className="form">
                  <legend>Publicar post</legend>
                  <Textarea hint="Escribe aqui" required />
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
