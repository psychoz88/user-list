import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import './item-add-form.css';

class ItemAddForm extends Component {

  state = {
    name: '',
    age: '',
    email: '',
    address: '',
    nameDirty: true,
    nameError: "",
    ageDirty: false,
    ageError: "",
    emailDirty: false,
    emailError: "",
    formValid: false
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.emailError !== prevState.emailError || this.state.ageError !== prevState.ageError || this.state.nameError !== prevState.nameError) {
      if (this.state.emailError || this.state.ageError || this.state.nameError) {
        this.setState({formValid: false})
      } else {
        this.setState({formValid: true})
      }
    }
  }

  blurHandler = (e) => {
    switch (e.target.name) {
        case 'name':
          this.setState({nameDirty: true})
          break
        case 'age':
          this.setState({ageDirty: true})
          break
        case 'email':
          this.setState({emailDirty: true})
          break
        default:
          console.log()
    }
  }

  onNameChange = (e) => {
    this.setState({
        name: e.target.value
    });
    const re = /^$/;
    if (re.test(e.target.value)) {
      this.setState({nameError: "Empty"})
    } else {
      this.setState({nameError: ""})
    }
  };

  onAgeChange = (e) => {
    this.setState({
        age: e.target.value
    });
    const re = /^[1-9][0-9]?$|^120$/;
    if (!re.test(e.target.value)) {
      this.setState({ageError: "Not correct"})
    } else {
      this.setState({ageError: ""})
    }
  };

  onEmailChange = (e) => {
    this.setState({
        email: e.target.value
    });
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      this.setState({emailError: "Not an Email"})
    } else {
      this.setState({emailError: ""})
    }
  };

  onAddressChange = (e) => {
    this.setState({
        address: e.target.value
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onItemAdded(this.state.name, +this.state.age, this.state.email, this.state.address);
    this.setState({
        name: '',
        age: '',
        email: '',
        address: '',
        nameDirty: false,
        nameError: "",
        ageDirty: false,
        ageError: "",
        emailDirty: false,
        emailError: "",
        formValid: false
    });
  };

  render() {

    const {name, age, email, address, nameDirty, nameError, ageDirty, ageError, emailDirty, emailError, formValid} = this.state;

    const {t} = this.props

    return (
      <form className="item-add-form d-flex flex-item-add"
            onSubmit={this.onSubmit}>
            
        {(nameDirty && nameError) && <div style={{color: 'red'}}>{nameError}</div>}
        <input type="text"
               className="form-control"
               onChange={this.onNameChange}
               placeholder={t("formTitles.name")}
               name="name"
               value={name} />
        {(ageDirty && ageError) && <div style={{color: 'red'}}>{ageError}</div>}
        <input type="number"
               className="form-control"
               onChange={this.onAgeChange}
               onBlur={this.blurHandler}
               placeholder={t("formTitles.age")}
               min="1"
               max="120"
               name="age"
               value={age} />
        {(emailDirty && emailError) && <div style={{color: 'red'}}>{emailError}</div>}
        <input type="text"
               className="form-control"
               onChange={this.onEmailChange}
               onBlur={this.blurHandler}
               placeholder={t("formTitles.email")}
               name='email'
               value={email} />
        <input type="text"
               className="form-control"
               onChange={this.onAddressChange}
               placeholder={t("formTitles.address")}
               value={address} />
        <button
          className="btn btn-primary" disabled={!formValid}>
          {t("buttons.add")}
        </button>
      </form>
    );
  }
}

export default withTranslation()(ItemAddForm);