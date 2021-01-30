import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ImportPage from './Pages/ImportPage';
import MenuPage from './Pages/MenuPage';
import PlayerPage from './Pages/PlayerPage';
import './App.global.css';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <ImportPage />
        </Route>
        <Route path="/player">
          <PlayerPage />
        </Route>
        <Route path="/">
          <MenuPage />
        </Route>
      </Switch>
    </Router>
  );
}
