import React, { Component } from "react";
// Optionally add a reusable Jumbotron element
import JumbotronFluid from "./elements/JumbotronFluid";
import UserList from "./UserList";
import UserForm from "./UserForm";
import serialize from "form-serialize";

class App extends Component {
  // Move constructor and componentDidMount code to App.
  constructor() {
    super();
    this.state = {
      users: [],
      isFetching: false
    };
  }

  // New add user action
  onAddUser = e => {
    e.preventDefault();
    const form = e.target;
    const body = serialize(form, { hash: true });
    console.log(body);
  };

  componentDidMount() {
    this.setState({ isFetching: true });
    fetch("https://reqres.in/api/users?delay=1")
      .then(response => response.json())
      .then(json => {
        this.setState({
          users: json.data,
          isFetching: false
        });
      });
  }

  render() {
    const { users, isFetching } = this.state;

    return (
      <div className="App">
        <JumbotronFluid
          heading="User CRUD"
          lead="Using an API for User CRUD operations"
        />
        <UserList users={users} isFetching={isFetching} />
        <br />
        <UserForm onSubmit={this.onAddUser} />
      </div>
    );
  }
}

export default App;
