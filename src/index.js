import React from 'react';
import ReactDOM from 'react-dom';
import 'materialize-css';
import App from './App';
import Cadastro from './cadastro'
import Principal from './principal'
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

ReactDOM.render( 
<BrowserRouter>
    <Switch>
        <Route path="/" exact={true} component={App} />
        <Route path="/cadastro" component={Cadastro} />
        <Route path="/principal" component={Principal} />
    </Switch>
</ BrowserRouter>
, document.getElementById('root'));
registerServiceWorker();
