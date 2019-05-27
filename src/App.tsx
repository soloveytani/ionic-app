import React, { Component } from 'react';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import {
  IonApp,
  IonContent,
  IonHeader,
  IonImg
} from '@ionic/react';
import FormCard from './FormCard';
import TaskCard from './TaskCard';
import Logo from './images/logo_pills.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <IonApp>
        <IonContent class="App-container">
          <IonHeader class="App-header">
            <IonImg src={ Logo } class="App-logo"></IonImg>
            <p className="App-title">Ваши заявки</p>
          </IonHeader>
          <FormCard />
          <div className="App-main-content">
            <TaskCard title="Неполадки с принтером" text="Закончился черный и цветной картириджи."/>
            <TaskCard title="Операционная система" text="Необходимо переустановаить ОС."/>
          </div>
        </IonContent>
      </IonApp>
    );
  }
}

export default App;