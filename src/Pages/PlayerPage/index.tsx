import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import React from 'react';
import FileContext from '../../utils/file-context';
import Player from '../../Components/Player';
import Text from '../../Components/Text';

import s from './style.css';

const PlayerPage = () => {
  const history = useHistory();
  const { file, setFile } = useContext(FileContext);
  const { title, text } = file;

  return (
    <div className={s.playerPage}>
      <h2>{title}</h2>
      <button className={s.backButton} onClick={() => history.push('/')}>
        back
      </button>
      <Text text={text} />
      <div className={s.playerWrapper}>
        <Player />
      </div>
    </div>
  );
};

export default PlayerPage;
