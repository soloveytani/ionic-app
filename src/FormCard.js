import React, { Component } from 'react';
import {
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonTextarea,
    IonImg
} from '@ionic/react';
import { ISSUE_TOPICS_OPTIONS } from './fixtures';
import './App.css';
import PlusIcon from './images/plus_circle.svg';

class FormCard extends Component {

    state = {
        issue: {
            related_to: '0',
            commentary: '', 
            priority: 'normal',
            status: 'needToDo'
        }
    };

    // componentDidUpdate = (prevProps) => {
    //     if (prevProps.issue !== this.props.issue && this.state.issue !== this.props.issue) {
    //         this.setState({ issue: this.props.issue })
    //         console.log(this.props.issue);
    //     }
    // };

    handleChange = (fieldName) => (event) => {
        this.setState({ issue: {...this.state.issue, [fieldName]: event.target.value} });
    };

    handleSubmit = () => {
        this.props.handleSubmit(this.state.issue)();
        this.setState({
            issue: {
                related_to: '0',
                commentary: '', 
                priority: 'normal',
                status: 'needToDo'
            }
        });
    };

    render() {

        const { issue } = this.state;

        return (
            <IonCard class="App-form">
                <div className="App-form-content">
                    <IonCardHeader>
                        <IonCardSubtitle class="App-form-date">28.05.2019 г.</IonCardSubtitle>
                        <IonCardTitle class="App-form-title">Новая заявка</IonCardTitle>
                    </IonCardHeader>
        
                    <IonCardContent>
                        <IonItem class="App-select-container">
                            <IonLabel class="App-select-label">Тема</IonLabel>
                            <IonSelect 
                                placeholder="С чем связана проблема?" 
                                interface="action-sheet" 
                                class="App-select" 
                                value={ issue.related_to }
                                onIonChange={ this.handleChange('related_to') }>
                            {
                                ISSUE_TOPICS_OPTIONS.map((topic) => 
                                    <IonSelectOption key={topic.value} value={topic.value}>{topic.label}</IonSelectOption>
                                )
                            }
                            </IonSelect>
                        </IonItem>
                        <IonItem class="App-select-container">
                            <IonLabel position="floating">Описание проблемы</IonLabel>
                            <IonTextarea
                                value={ issue.commentary }
                                onIonChange={ this.handleChange('commentary') } />
                        </IonItem>
                        <IonImg src={ PlusIcon } class="App-add-button" onClick={ this.handleSubmit }></IonImg>
                    </IonCardContent>
                </div>
            </IonCard>
        );
    }
}

export default FormCard;