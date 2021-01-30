import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ImportPage from './Pages/ImportPage';
import MenuPage from './Pages/MenuPage';
import PlayerPage from './Pages/PlayerPage';

import { FileProvider } from './utils/file-context';
import './App.global.css';

export default function App() {
  const [file, setFile] = React.useState<any>({});
  const value = { file, setFile };

  return (
    <FileProvider value={value}>
      <Router>
        <Switch>
          <Route path="/import">
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
    </FileProvider>
  );
}
