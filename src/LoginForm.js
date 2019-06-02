import React, { Component } from 'react'
import { IonModal, IonButton, IonItem, IonLabel, IonInput, IonImg } from '@ionic/react';
import Logo from './images/logo_pills.svg';

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            login: '',
            password: ''
        };
    };

    componentDidUpdate = (prevProps) => {
        if (this.props.open !== this.state.open && this.props.open !== prevProps.open) 
            this.setState({ open: this.props.open });
    };

    handleChange = (name) => (event) => {
        this.setState({ [name]: event.target.value });
    };

    onLoginButton = () => {
        fetch(`https://tatiana-backend.herokuapp.com/sessions`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({"auth":{"login": this.state.login ,"password": this.state.password}})
        }).then(result => result.json())
        .then((result) => {
            this.props.onLogin(result.jwt);
            this.setState({ open: false })
        }).catch(err => console.error(err));
    };

    render() {
        return (
            <IonModal
                isOpen={this.state.open}
                onDidDismiss={() => this.setState(() => ({ open: false }))} 
                class="App-login-modal"
            >
                <div className="App-login-container">
                    <IonImg src={ Logo } class="App-login-image"></IonImg>
                    <IonItem class="App-login-input">
                        <IonLabel position="floating">Логин</IonLabel>
                        <IonInput onIonChange={ this.handleChange('login') }></IonInput>
                    </IonItem>
                    <IonItem class="App-login-input">
                        <IonLabel position="floating">Пароль</IonLabel>
                        <IonInput type="password" onIonChange={ this.handleChange('password') }></IonInput>
                    </IonItem>
                    <IonButton onClick={ this.onLoginButton } class="App-login-button">
                        Войти
                    </IonButton>
                </div>
                
            </IonModal>
        );
    };
};

export default LoginForm;