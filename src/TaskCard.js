import React from 'react';

import { 
    IonCard, 
    IonCardHeader, 
    IonCardSubtitle, 
    IonCardTitle, 
    IonCardContent 
} from '@ionic/react';

import './App.css';

const TaskCard = ({ title, text }) => (
    <IonCard class="App-task-card">
        <IonCardHeader>
        <IonCardSubtitle class="App-task-date">22.05.2019</IonCardSubtitle>
        <IonCardTitle class="App-task-title">{ title }</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>{ text } </IonCardContent>
    </IonCard>
);

export default TaskCard;