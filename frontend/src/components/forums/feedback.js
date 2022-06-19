import React, { useState, useEffect } from 'react';
import { submitFeedback } from './index';
import { isAuthenticated } from '../auth';

const Feedback = () => {
  const [values, setValues] = useState({
    title: '',
    description: '',
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const { username } = isAuthenticated().user;
  console.log(username);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSuccess('');
    setError('');

    submitFeedback(title, description, username)
      .then((data) => {
        if (data.success) {
          setSuccess(data.message.message);
        } else {
          setError(data.message.message);
        }

        setValues({
          ...values,
          title: '',
          description: '',
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const { title, description } = values;

  const [isAvailable, setIsAvailable] = useState(false);

  const enableSubmit = () => {
    const enable = title.length > 0 && description.length > 0;

    if (enable) setIsAvailable(true);
    else setIsAvailable(false);
  };

  useEffect(() => {
    enableSubmit();
  }, [values]);

  return (
    <div className='mid-content'>
      <div className='forms-area'>
        <div className='form-group form-fields'>
          <h1>Feedback</h1>
        </div>
        <form>
          {success && (
            <div className='form-group form-fields'>
              {' '}
              <div class='alert alert-success form-control' role='alert'>
                {success}
              </div>
            </div>
          )}

          {error && (
            <div className='form-group form-fields'>
              {' '}
              <div class='alert alert-danger form-control' role='alert'>
                {error}
              </div>
            </div>
          )}
          <div className='form-group form-fields'>
            <input
              type='text'
              className='form-control'
              name='title'
              id='exampleFormControlInput1'
              placeholder='Enter Title'
              value={values.title}
              onChange={handleChange('title')}
            />
          </div>
          <div className='form-group form-fields'>
            <textarea
              className='form-control'
              id='exampleFormControlTextarea1'
              name='description'
              placeholder='Enter the details about the feature or list you want to add'
              rows={5}
              //   defaultValues={values.description}
              value={values.description}
              onChange={handleChange('description')}
            />
          </div>
          <div className='form-fields'>
            <button
              type='submit'
              onClick={handleSubmit}
              disabled={!isAvailable}
              className='btn btn-danger mb-2'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
