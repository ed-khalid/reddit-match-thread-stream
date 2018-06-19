import React, { Component } from 'react';
import logo from './logo.svg';
import { CommentStream } from './CommentStream';
import './App.css';

class App extends Component {

  constructor() {
    super();
    let stream = new CommentStream('8s4ldn',1,1,1000);

    this.state = {
      comments: []
      ,stream: stream 
      ,event: stream.event
    }

    this.state.event.on('comment', (comment) => {
      this.setState({
        comments: [...this.state.comments, comment]
      })
    })
    this.state.stream.start();
  }


  render() {
    return (
      <div className="App">
      <ul>
        {this.state.comments.map((comment,i) => <li key={i}>{comment}</li> )}
      </ul>
      </div>
    );
  }
}

export default App;
