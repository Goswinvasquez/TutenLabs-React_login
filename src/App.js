
import Login from './pages/login';
import Lista from './pages/lista';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';



function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/lista" component={Lista} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;
