import React from 'react';
import { Formik, Field, Form } from 'formik';
import useList from '../../utils/useList';
import { useHistory } from 'react-router-dom';
import FileContext from '../../utils/file-context';

import s from './style.css';

const ImportPage = () => {
  const [_, updateList] = useList();
  const history = useHistory();
  const { file, setFile } = React.useContext(FileContext);

  return (
    <div className="import-page">
      <Formik
        initialValues={{
          title: '',
          text: '',
          file: {},
        }}
        onSubmit={async (values) => {
          console.log('a');
          setFile(values);
          updateList(values);
          history.push('/player');
        }}
      >
        {(props) => (
          <Form>
            <h3 className={s.title}>Title</h3>
            <Field id="title" name="title" />

            <h3 className={s.title}>Text</h3>
            <Field id="text" name="text" component="textarea" />

            <h3 className={s.title}>File</h3>
            <Field
              id="file"
              name="file"
              component={() => (
                <input
                  id="file"
                  name="file"
                  type="file"
                  onChange={(event: any) => {
                    props.setFieldValue('file', event.currentTarget.files[0]);
                  }}
                />
              )}
            />
            <div className={s.controls}>
              <button onClick={() => history.push('/')}>Back</button>
              <button type="submit">Submit</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ImportPage;
