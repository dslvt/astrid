import { createContext } from 'react';

const FileContext = createContext<any>({ file: {}, setFile: () => {} });

export const FileProvider = FileContext.Provider;
export const FileConsumer = FileContext.Consumer;

export default FileContext;
