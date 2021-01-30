import React from 'react';
import { Formik, Field, Form } from 'formik';
import useList from '../../utils/useList';
import { useHistory } from 'react-router-dom';
import FileContext from '../../utils/file-context';

const ImportPage = () => {
  // return <div className="import-page">name \n file \n text \n ok \n</div>;
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
          setFile(values);
          updateList(values);
          history.push('/player');
        }}
      >
        {(props) => (
          <Form>
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" />

            <label htmlFor="text">Text</label>
            <Field id="text" name="text" component="textarea" />

            <label htmlFor="file">File</label>
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
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ImportPage;
