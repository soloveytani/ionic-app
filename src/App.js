import React, { Component } from 'react';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import {
    IonApp,
    IonContent,
    IonHeader,
    IonImg,
    IonToast,
    IonButton,
    IonIcon
} from '@ionic/react';
import FormCard from './FormCard';
import TaskCard from './TaskCard';
import LoginForm from './LoginForm';
import Logo from './images/logo_pills.svg';
import './App.css';

class App extends Component {

    state = {
        openLoginForm: false,
        token: null,
        issues: [],
        showToast: false,
        issue: {
            related_to: '0',
            commentary: '', 
            priority: 'normal',
            status: 'needToDo'
        }
    };

    componentDidMount = () => {
        this.message = "";
        if (!localStorage.token) setTimeout(() => this.setState({openLoginForm: true}), 300);
        else this.setState({ token: localStorage.token });
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (this.state.token && this.state.token !== prevState.token) this.getUserIssues();
    };

    getUserIssues = () => {
        fetch(`https://tatiana-backend.herokuapp.com/issues`,{
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + this.state.token
            }
        }).then(result => result.json())
          .then((result) => {
            this.setState({issues: result})
        }).catch(err => console.error(err));
    };

    createUpdateIssue = ( issue ) => () => {
        let type = issue.id ? 'edit' : 'create';
        let url = `https://tatiana-backend.herokuapp.com/issues` + (type === 'edit' ? `/${issue.id}` : '');
        fetch(url,{
            method: type === 'edit' ? "PUT" : "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + this.state.token
            },
            body: JSON.stringify({
                issue: issue
            })
        }).then( result => result.json() )
        .then( result => {
            this.message = type === 'edit' ? "Ваша заявка успешно обновлена" : "Ваша заявка успешно отправлена";
            this.setState({ showToast: true });
            setTimeout( () => this.getUserIssues(), 500);
        }).catch( err => console.error(err) );
    };

    deleteIssue = (issueId) => () => {
        let url = `https://tatiana-backend.herokuapp.com/issues/` + issueId;
        fetch(url, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + this.state.token
            }
        }).then()
        .then( () => {
            this.message = "Ваша заявка успешно удалена";
            this.setState({ showToast: true });
            setTimeout( () => this.getUserIssues(), 500);
        }).catch(err => console.error(err));
    };

    setUserToken = (token) => {
        this.setState({ token: token });
        localStorage.setItem('token', token);
        setTimeout(() => this.setState({openLoginForm: false}), 300);
    };

    logOut = () => {
        setTimeout(() => this.setState({openLoginForm: true}), 300);
    };

    render() {
        const { openLoginForm, issues, showToast } = this.state;
        return (
            <IonApp>
                <IonContent class="App-container">
                    <IonHeader class="App-header">
                        <IonImg src={ Logo } class="App-logo"></IonImg>
                        <p className="App-title">Ваши заявки</p>
                        <IonButton class="App-log-out" onClick={ this.logOut }>
                            <IonIcon slot="icon-only" name="log-out" />
                        </IonButton>
                    </IonHeader>
                    <FormCard handleSubmit={ this.createUpdateIssue }/>
                    <div className="App-main-content">
                    {
                        issues.map((issue) => (
                            <TaskCard 
                                key={ issue.id } 
                                issue={ issue }
                                updateIssue={ this.createUpdateIssue }
                                deleteIssue={ this.deleteIssue }
                            />
                        ))
                    }
                    </div>
                    <IonToast
                        isOpen={ showToast }
                        onDidDismiss={ () => this.setState(() => ({ showToast: false })) }
                        message={ this.message }
                        duration={200}
                    >
                    </IonToast>
                    <LoginForm open={ openLoginForm } onLogin={ this.setUserToken }/>
                </IonContent>
            </IonApp>
        );
    }
}

export default App;