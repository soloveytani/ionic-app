import React, { Component } from 'react';

import { 
    IonCard, 
    IonCardHeader, 
    IonCardSubtitle, 
    IonCardTitle, 
    IonCardContent,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonLabel,
    IonTextarea,
    IonButton,
    IonBadge
} from '@ionic/react';
import { ISSUE_TOPICS, ISSUE_TOPICS_OPTIONS, ISSUE_STATUS } from './fixtures';

import './App.css';

class TaskCard extends Component {

    state = {
        issue: {},
        prevIssue: {},
        editorIsOpen: false
    };

    componentDidMount = () => {
        this.setState({ issue: this.props.issue });
    };

    openEditor = () => {
        this.setState({ editorIsOpen: true, prevIssue: this.state.issue })
    };

    closeEditor = () => {
        this.setState({ editorIsOpen: false, issue: this.state.prevIssue });
    };

    handleChange = (fieldName) => (event) => {
        this.setState({ issue: {...this.state.issue, [fieldName]: event.target.value} });
    };

    saveChanges = () =>{
        this.props.updateIssue(this.state.issue)();
        this.setState({ editorIsOpen: false });
    };

    render() {

        const { issue, editorIsOpen } = this.state;
        const { deleteIssue } = this.props;

        return (
            <IonCard class="App-task-card">
            {   !editorIsOpen &&
                <div onClick={ this.openEditor } >
                    <IonCardHeader>
                        <IonCardSubtitle class="App-task-date">{ issue.created_at }</IonCardSubtitle>
                        <IonBadge class="App-task-status"
                            color={ issue.status === 'needToDo' ? "warning" : issue.status === 'inProgress' ? "tertiary" : "success"}>
                            { ' ' }
                        </IonBadge>
                        <IonCardTitle class="App-task-title">{ ISSUE_TOPICS[issue.related_to] }</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>{ issue.commentary } </IonCardContent>
                </div>
            }
            {
                editorIsOpen &&
                <IonCardContent>
                    <IonBadge class="App-task-full-status"
                        color={ issue.status === 'needToDo' ? "warning" : issue.status === 'inProgress' ? "tertiary" : "success"}>
                        { ISSUE_STATUS[issue.status] }
                    </IonBadge>
                    <i className="icon ion-md-close" onClick={ this.closeEditor }></i>
                    <IonCardSubtitle class="App-task-date">{ issue.created_at }</IonCardSubtitle>
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
                    <IonButton 
                        size="small" 
                        color="tertiary" 
                        class="App-delete-button"
                        onClick={ deleteIssue(issue.id) }>
                            Удалить
                    </IonButton>
                    <IonButton 
                        size="small" 
                        color="secondary" 
                        class="App-save-button"
                        onClick={ this.saveChanges }>
                            Сохранить
                    </IonButton>
                </IonCardContent>
            }
            </IonCard>
        );
    };
};

export default TaskCard;