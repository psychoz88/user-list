import React, { Component } from 'react';
import UserService from "../../services/user-service";
import Modal from '../modal';
import { withTranslation } from 'react-i18next';
import './person-details.css';

class PersonDetails extends Component {

  userService = new UserService();

  state = {
    person: null,
    modalActive: false
  };

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) {
      this.updatePerson();
    }
  }

  updatePerson() {
    const { personId } = this.props;
    if (!personId) {
      return;
    }

    this.userService
      .getPerson(personId)
      .then((person) => {
        this.setState({ person });
      });
  }

  setModalActive = (item) => {
    this.setState({
        modalActive: item
    })
  }

  getIdAndUpdate = (id) => {
    const {updateUserList} = this.props;
    this.userService
        .getPerson(id)
        .then((person) => {
            this.setState({ person });
        });
    updateUserList()
  }

  render() {
    const {t} = this.props

    if (!this.state.person) {
      return <span>{t("selectPerson")}</span>;
    }

    const { name, age, email, address} = this.state.person;
    const {modalActive} = this.state;

    return (
      <div className="person-details card">
        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">{t("formTitles.age")}:</span>
              <span>{age}</span>
            </li>
            <li className="list-group-item">
              <span className="term">{t("formTitles.email")}:</span>
              <span>{email}</span>
            </li>
            <li className="list-group-item">
              <span className="term">{t("formTitles.address")}:</span>
              <span>{address}</span>
            </li>
          </ul>
        </div>
        <button
          className="btn btn-warning" onClick={this.setModalActive}>
          {t("buttons.edit")}
        </button>
        <div className="col-md-6 modal-fixed">
            <Modal active={modalActive} setActive={this.setModalActive} user={this.state.person} onItemEdit={(id) => this.getIdAndUpdate(id)} userId={this.props.personId}/>
        </div>
      </div>
    )
  }
}; // PersonDetails

export default withTranslation()(PersonDetails);