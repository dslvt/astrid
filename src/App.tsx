import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ImportPage from './Pages/ImportPage';
import MenuPage from './Pages/MenuPage';
import PlayerPage from './Pages/PlayerPage';

import { FileProvider } from './utils/file-context';
import './App.global.css';

const text = `André: Bonjour, Martine, comment vas-tu ? Que fais-tu ici?
Martine: Bonjour, André. Je voudrais m'inscrire dans un cours d'espagnol et je voudrais aussi obtenir des informations sur les cours de langue française pour étrangers. Et toi, que fais-tu ici, tu étudies une langue étrangère ?
André: Oui, je suis en train de suivre un cours d’arabe. Je me suis inscrit pour trois mois et j’en suis au début. Mais cette langue est difficile.
Martine: j’imagine ! Cependant, cet endroit est super.
André: Oui, il l’est. On peut y étudier l'espagnol, le chinois, le roumain, l’albanais. Et puis, il y a aussi un cours de tagalog, la langue des Philippins, et, bien sûr, l'arabe. Et, bien sûr, on peut aussi apprendre l'anglais et le l’italien.
Martine: Et pour les cours de langue française ?
André: En ce qui concerne le français, il existe plusieurs possibilités de l’étudier, mais pour en savoir plus, vous devriez parler à quelqu'un du secrétariat.
Martine: Bonne idée. Une de mes amies, en fait, aimerait prendre un cours en français et c’est pour elle que je demande ces informations.
André: Bon, maintenant, je dois partir. Tu voudrais que je t’accompagne demain matin au secrétariat ? Vers 10 h ? Tu pourrais peut-être venir avec ton amie.
Martine: Oui, merci, c’est très aimable de ta part…`;

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
