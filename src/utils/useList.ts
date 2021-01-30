import { useState, useEffect } from 'react';
const fs = require('fs');

const useList = () => {
  const [settingsList, setSettingsList] = useState({});
  const baseUrl = process.cwd();

  useEffect(() => {
    const settingsUrl = baseUrl + '/settings';

    if (!fs.existsSync(settingsUrl)) {
      fs.mkdirSync(settingsUrl);
    }

    const listSettingsUrl = baseUrl + '/settings/list.json';

    if (!fs.existsSync(listSettingsUrl)) {
      fs.appendFile(listSettingsUrl, '{}', (err: any) => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
      });
    }

    const file = fs.readFileSync(listSettingsUrl);
    let settings = JSON.parse(file);
    console.log('settings', settings);
    setSettingsList(settings);
  }, []);

  return [settingsList, setSettingsList];
};

export default useList;
