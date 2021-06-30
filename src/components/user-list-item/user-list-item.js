import React, { Component } from 'react';

import './user-list-item.css';

export default class UserListItem extends Component {

  render() {

    const {name, onDeleted} = this.props;

    return (
      <span className="todo-list-item">
        <span className="todo-list-item-label">
          {name}
        </span>
        <span onClick={e => e.stopPropagation()}>
          <button 
            type="button"
            className="btn btn-outline-danger btn-sm float-right"
            onClick={onDeleted}>
              <i className="fa fa-trash-o" />
          </button>
        </span>
      </span>
    );
  };
}