import React from 'react';
import { useHistory } from 'react-router-dom';
import useList from '../../utils/useList';
import FileContext from '../../utils/file-context';
import s from './menu.css';

const ImportPage = () => {
  const history = useHistory();

  const [settingsList, setSettingsList] = useList();
  const { file, setFile } = React.useContext(FileContext);

  return (
    <div className={s['main-page']}>
      <h1 className={s.title}>astrid</h1>
      <button
        className={s['new-button']}
        onClick={() => {
          history.push('/import');
        }}
      >
        New dialog
      </button>
      <div className={s['texts-list']}>
        {settingsList.files.map((item: any) => (
          <div
            className={s.text}
            onClick={() => {
              setFile(item);
              history.push('/player');
            }}
          >
            <h2>{item.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImportPage;
