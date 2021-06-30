import React, {useEffect, useState} from 'react';
import UserService from "../../services/user-service";
import {useTranslation} from "react-i18next";
import "../../i18n";
import './modal.css';

const Modal = ({active, setActive, user, onItemEdit, userId}) => {

    const userService = new UserService();
    const {t} = useTranslation();

    const {name, age, email, address} = user;

    const [editName, setName] = useState("");
    const [editAge, setAge] = useState("");
    const [editEmail, setEmail] = useState("");
    const [editAddress, setAddress] = useState("");

    const [emailDirty, setEmailDirty] = useState(true);
    const [emailError, setEmailError] = useState('');
    const [ageDirty, setAgeDirty] = useState(true);
    const [ageError, setAgeError] = useState('');
    
    const [formValid, setFormValid] = useState(true);

    useEffect(() => {
        if (emailError || ageError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, ageError])

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true)
            break 
            case 'age':
                setAgeDirty(true)
            break
            default:
                console.log()
        }
    }
    
    function onNameChange(e) {
        setName(e.target.value)
    };
    function onAgeChange(e) {
        setAge(e.target.value)
        const re = /^[1-9][0-9]?$|^120$/;
        if (!re.test(e.target.value)) {
            setAgeError("Not correct")
        } else {

            setAgeError('')
        }
    };
    function onEmailChange(e) {
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('Not an Email')
        } else {

            setEmailError('')
        }
    };
    function onAddressChange(e) {
        setAddress(e.target.value)
    };
    
    function onSubmit(e){
        e.preventDefault();
        const data = {
            Name: editName,
            Age: +editAge,
            Email: editEmail,
            Address: editAddress
        }
        userService
            .putPerson(data, userId)
            .then(() => {onItemEdit(userId)});
        setDefault()
    };

    function setDefault() {
        setName("")
        setAge("")
        setEmail("")
        setAddress("")
        setEmailDirty(true);
        setEmailError('');
        setAgeDirty(true);
        setAgeError('');
        setFormValid(true);
    }

    return (
        <div className={active ? "modal active" : "modal" }>
            <div className={active ? "modal-dialog active" : "modal-dialog" } role="document" onClick={e => e.stopPropagation()}>
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{t("modalTitle")} {name}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" 
                        onClick={() => {
                            setActive(false)
                            setDefault()
                        }}>
                        <span aria-hidden="true"></span>
                    </button>
                </div>
                <div className="modal-body">

                <form className="item-add-form d-flex flex-modal"
                        onSubmit={onSubmit}>

                    <input type="text"
                        className="form-control"
                        onChange={onNameChange}
                        placeholder={name}
                        value={editName} />
                    {(ageDirty && ageError) && <div style={{color: 'red'}}>{ageError}</div>}
                    <input type="number"
                        className="form-control"
                        onChange={onAgeChange}
                        onBlur={e => blurHandler(e)}
                        placeholder={age}
                        min="1"
                        max="120"
                        name="age"
                        value={editAge} />
                    {(emailDirty && emailError) && <div style={{color: 'red'}}>{emailError}</div>}
                    <input type="text"
                        className="form-control"
                        onChange={onEmailChange}
                        onBlur={e => blurHandler(e)}
                        placeholder={email}
                        name='email'
                        value={editEmail} />
                    <input type="text"
                        className="form-control"
                        onChange={onAddressChange}
                        placeholder={address}
                        value={editAddress} />
                    <button
                    className="btn btn-primary" onClick={() => setActive(false)} disabled={!formValid}>
                    {t("buttons.save")}
                    </button>
                </form>

                </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                            onClick={() => {
                                setActive(false)
                                setDefault()
                            }}>{t("buttons.close")}</button>
                    </div>
                </div>
            </div>
        </div>
    )
};



export default Modal;