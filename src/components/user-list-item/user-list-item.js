import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

import './user-list-item.css';

class UserListItem extends Component {

  render() {

    const {t} = this.props
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
              {t("buttons.delete")}
          </button>
        </span>
      </span>
    );
  };
}

export default withTranslation()(UserListItem);