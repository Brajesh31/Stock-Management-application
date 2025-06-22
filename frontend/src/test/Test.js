import React, { Component } from "react";

import Button from "@mui/material/Button";

class Container extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
    };
    this.increment = () => this.setState({ counter: this.state.counter + 1 });
    this.decrement = () => this.setState({ counter: this.state.counter - 1 });
  }
  componentWillUnmount() {
    console.log("unmount");
    alert("remove counter");
  }
  render() {
    return (
      <div>
        {" "}
        <div>
          <Button variant="contained" onClick={this.decrement}>
            decrement
          </Button>
          <Button variant="contained">{this.state.counter}</Button>
          <Button variant="contained" onClick={this.increment}>
            increment
          </Button>
        </div>
      </div>
    );
  }
}
class Test extends Component {
  constructor(props) {
    console.log("constructor");
    super(props);
    this.state = {
      showCounter: true,
    };
  }
  componentDidUpdate() {
    console.log("component did update");
  }
  componentDidMount() {
    console.log("component did mount");
  }

  hadelShowCounter = () => {
    this.setState({ showCounter: !this.state.showCounter });
  };
  render() {
    console.log("render method");
    return (
      <>
        {this.state.showCounter && <Container />}
        <Button variant="contained" onClick={this.hadelShowCounter}>
          {!this.state.showCounter && <div>Show counter</div>}
          {this.state.showCounter && <div>remove counter</div>}
        </Button>
      </>
    );
  }
}

export default Test;
