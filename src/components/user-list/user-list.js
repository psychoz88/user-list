import React, { Component } from 'react';
import UserService from "../../services/user-service";
import UserListItem from "../user-list-item/user-list-item"; 

import './user-list.css';

export default class UserList extends Component {

  userService = new UserService();

  state = {
    peopleList: [
      {
        id: 1,
        name: 'Mariia'
      },
  
      {
        id: 2,
        name: 'Jenia'
      },
    ]
  };

  componentDidMount() {
    this.update();
  }

  componentDidUpdate(prevProps) {
    if (this.props.isChanged !== prevProps.isChanged) {
      this.update();
    }
  }

  update() {
    this.userService
    .getAllPeople()
    .then((peopleList) => {
      this.setState({
        peopleList
      });
    });
  }

  renderItems(arr) {

    const {onDeleted} = this.props;

    return arr.map((item) => {
      const {id} = item;
      return (
        <li className="list-group-item"
            key={id}
            onClick={() => this.props.onItemSelected(id)}>
          <UserListItem 
            {...item}
            onDeleted={() => onDeleted(id)}/>
        </li>
      );
    });
  }

  render() {

    const { peopleList } = this.state;

    const items = this.renderItems(peopleList);

    return (
      <ul className="item-list list-group">
        {items}
      </ul>
    );
  }
}; //UserLIst