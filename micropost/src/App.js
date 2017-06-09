import React, { Component } from 'react';
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

    // this.handleAuth = this.handleAuth.bind(this);
    // this.handleLogout = this.handleLogout.bind(this);
    // this.handleUpload = this.handleUpload.bind(this);
  }

  componentWillMount() {
    fetch('http://192.168.0.26/post/list')
      .then((response) => response.json())
      .then((response) => {
        console.log(response.posts);
        this.setState({ posts: response.posts });
      });
  }
  // renderUploadButton() {
  //   if (this.state.uploadValue > 0 && this.state.uploadValue < 100) {
  //     return (
  //       <div className="margin-right">
  //         <div className="progress">
  //           <div className="indeterminate" />
  //         </div>
  //         <small>Subiendo... {Math.round(this.state.uploadValue)}%</small>
  //       </div>
  //     );
  //   }
  //   return (<FileUpload onUpload={this.handleUpload} />);
  // }

  // renderUserData() {
  //   if (this.state.user) {
  //     return (
  //       <div className="App-button">
  //         {this.renderUploadButton()}
  //         <img src={this.state.user.photoURL} alt={this.state.user.displayName} />
  //         <Button onClick={this.handleLogout}>Salir</Button>
  //       </div>
  //     );
  //   }
  // }

  // renderLoginButton() {
  //   // Si el usuario esta logueado
  //   if (this.state.user) {
  //     return (
  //       <div className="Card-container">
  //         {
  //           this.state.pictures.map((picture, key) => (
  //             <Card obj={picture} key={key} />
  //           )).reverse()
  //         }
  //       </div>
  //     );
  //   }
  //   return (
  //     <div>
  //       <button onClick={this.handleAuth} className="btn-login">
  //         <img className="logo-login" src={logoGoogle} alt="logo google" />
  //         <span>Login con google</span>
  //       </button>
  //     </div>
  //   );
  // }

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
