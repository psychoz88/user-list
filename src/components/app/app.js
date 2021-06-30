import React, { Component } from 'react';
import Header from '../header';
import UserList from '../user-list';
import ItemAddForm from '../item-add-form';
import PersonDetails from '../person-details';
import UserService from "../../services/user-service";

import './app.css';

export default class App extends Component {

    userService = new UserService();

    state = {
        selectedPerson: '',
        isChanged: false
    };

    onPersonSelected = (id) => {
        this.setState({
            selectedPerson: id
        });
    };

    createUserItem(name, age, email, address) {
        return {
            Name: name,
            Age: age,
            Email: email,
            Address: address
        }
    };

    addItem = (name, age, email, address) => {
        const newItem = this.createUserItem(name, age, email, address);
        console.log(newItem, 'newItem')
        this.userService
            .postResource('/users', newItem)
            .then(() => {
                this.onChange();
            });
        this.backChange()
    };

    deleteItem = (id) => {
        this.userService
        .deletePerson(id)
        .then(() => {
            this.onChange();
        })
        this.backChange()
    };

    onChange = () => {
        this.setState({
            isChanged: true
        })
    }

    backChange = () => {
        this.setState({
            isChanged: false
        })
    }

    updateUserList = () => {
        this.onChange();
        this.backChange()
    }

    render() {

        const {isChanged} = this.state;

        return (
        <div className="stardb-app">
            <Header />
            <div className="row mb2 main-content">
            <div className="col-md-6">
                <UserList 
                  onItemSelected={this.onPersonSelected} 
                  isChanged={isChanged} 
                  onChange={this.onChange} 
                  onDeleted={this.deleteItem}/>
            </div>
            <div className="col-md-6">
                <ItemAddForm onItemAdded={this.addItem}/>
            </div>
            <div className="col-md-6 select-person">
                <PersonDetails personId={this.state.selectedPerson} updateUserList={this.updateUserList}/>
            </div>
            </div>
        </div>
        );
    }
}; // App