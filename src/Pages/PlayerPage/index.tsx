import { useState, useEffect, useContext } from 'react';
import React from 'react';
import FileContext from '../../utils/file-context';

const PlayerPage = () => {
  const { file, setFile } = useContext(FileContext);

  return <div>{JSON.stringify(file)}</div>;
};

export default PlayerPage;
