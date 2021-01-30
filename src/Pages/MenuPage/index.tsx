import React from 'react';
import { useHistory } from 'react-router-dom';
import useList from '../../utils/useList';
import FileContext from '../../utils/file-context';
import './menu.css';

const ImportPage = () => {
  const history = useHistory();

  const [settingsList, setSettingsList] = useList();
  const { file, setFile } = React.useContext(FileContext);

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
      <div className="texts-list">
        {settingsList.files.map((item: any) => (
          <div
            className="text"
            onClick={() => {
              setFile(item);
              history.push('/player');
            }}
          >
            <h3>{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImportPage;
