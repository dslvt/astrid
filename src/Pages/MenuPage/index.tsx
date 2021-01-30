import React from 'react';
import { useHistory } from 'react-router-dom';
import useList from '../../utils/useList';
import './menu.css';

const ImportPage = () => {
  const history = useHistory();

  const [settingsList, setSettingsList] = useList();
  console.log('settingsList', settingsList);

  return (
    <div className="menu-page">
      <h1>astrid</h1>
      <button
        className="new-button"
        onClick={() => {
          history.push('/import');
        }}
      >
        New text
      </button>
      <div className="texts-list"></div>
    </div>
  );
};

export default ImportPage;
