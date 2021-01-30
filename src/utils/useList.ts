import { useState, useEffect } from 'react';
const fs = require('fs');

const useList = () => {
  const [filesList, setFilesList] = useState<any>({ files: [] });
  const baseUrl = process.cwd();
  const listSettingsUrl = baseUrl + '/settings/files.json';

  const updateList = (file: any) => {
    const fullFiles = {
      files: [
        ...filesList.files,
        {
          title: file.title,
          text: file.text,
          file: {
            name: file.file.name,
            path: file.file.path,
            type: file.file.type,
          },
        },
      ],
    };
    console.log(fullFiles, file);
    fs.writeFileSync(listSettingsUrl, JSON.stringify(fullFiles));
    setFilesList(fullFiles);
  };

  useEffect(() => {
    const settingsUrl = baseUrl + '/settings';

    if (!fs.existsSync(settingsUrl)) {
      fs.mkdirSync(settingsUrl);
    }

    if (!fs.existsSync(listSettingsUrl)) {
      fs.appendFile(listSettingsUrl, '{"files":[]}', (err: any) => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
      });
    }

    const file = fs.readFileSync(listSettingsUrl);
    let settings = JSON.parse(file);
    console.log('files', settings);
    setFilesList(settings);
  }, []);

  return [filesList, updateList];
};

export default useList;
