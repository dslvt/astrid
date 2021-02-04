import { useState, useEffect } from 'react';
const fs = require('fs');

const useFile = (fileName: any) => {
  const [wordsList, setWordsList] = useState<any>({});
  const baseUrl = process.cwd();
  const listSettingsUrl = baseUrl + `/settings/files/${fileName}.json`;

  const updateWords = ({ id, start, end }: any) => {
    const fullInfo = {
      ...wordsList,
      [id]: { start, end },
    };
    console.log(fullInfo, { id, start, end });
    fs.writeFileSync(listSettingsUrl, JSON.stringify(fullInfo));
    setWordsList(fullInfo);
  };

  const deleteWords = (id: any) => {
    const { [id]: _, ...others } = wordsList;
    setWordsList(others);
  };

  useEffect(() => {
    const settingsUrl = baseUrl + `/settings/files`;

    if (!fs.existsSync(settingsUrl)) {
      fs.mkdirSync(settingsUrl);
    }

    if (!fs.existsSync(listSettingsUrl)) {
      fs.appendFile(listSettingsUrl, '{}', (err: any) => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
      });
    }

    const file = fs.readFileSync(listSettingsUrl);
    let readAll = JSON.parse(file);
    console.log('files', readAll);
    setWordsList(readAll);
  }, []);

  return [wordsList, updateWords, deleteWords];
};

export default useFile;
