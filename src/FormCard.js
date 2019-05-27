import React from 'react';

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

import './App.css';
import PlusIcon from './images/plus_circle.svg';

const FormCard = () => (
    <IonCard class="App-form">
        <div class="App-form-content">
            <IonCardHeader>
                <IonCardSubtitle class="App-form-date">28.05.2019 г.</IonCardSubtitle>
                <IonCardTitle class="App-form-title">Новая заявка</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <IonItem class="App-select-container">
                    <IonLabel class="App-select-label">Тема</IonLabel>
                    <IonSelect placeholder="С чем связана проблема?" interface="action-sheet" class="App-select">
                        <IonSelectOption value="printer">Принтер</IonSelectOption>
                        <IonSelectOption value="os">Операционная система</IonSelectOption>
                    </IonSelect>
                </IonItem>
                <IonItem class="App-select-container">
                    <IonLabel position="floating">Описание проблемы</IonLabel>
                    <IonTextarea></IonTextarea>
                </IonItem>
                <IonImg src={ PlusIcon } class="App-add-button"></IonImg>
            </IonCardContent>
        </div>
    </IonCard>
);

export default FormCard;