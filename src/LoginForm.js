import React, { Component } from 'react'
import { IonModal, IonButton, IonItem, IonLabel, IonInput, IonImg } from '@ionic/react';
import Logo from './images/logo_pills.svg';

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    };

    componentDidUpdate = (prevProps) => {
        if (this.props.open !== this.state.open && this.props.open !== prevProps.open) 
            this.setState({ open: this.props.open });
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
                        <IonInput></IonInput>
                    </IonItem>
                    <IonItem class="App-login-input">
                        <IonLabel position="floating">Пароль</IonLabel>
                        <IonInput></IonInput>
                    </IonItem>
                    <IonButton onClick={() => this.setState(() => ({ open: false }))} class="App-login-button">
                        Войти
                    </IonButton>
                </div>
                
            </IonModal>
        );
    };
};

export default LoginForm;