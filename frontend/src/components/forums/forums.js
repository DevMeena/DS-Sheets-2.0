import React, { useEffect, useState } from 'react';
import { getFeedback, deleteFeedback } from './index';

const Card = ({ f }) => {
  const resolveFeedback = (e) => {
    const fid = e.target.value;

    deleteFeedback(fid)
      .then((data) => {
        if (data.success) {
          console.log(data.message);
          window.location.reload();
        } else {
          console.log(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className='card bug-card'>
      <div className='card-header reportedBy'>{f.username}</div>
      <div className='card-body'>
        <h5 className='card-title bugName'> {f.title} </h5>
        <h6 className='card-title' style={{ color: 'grey' }}>
          {f.time.slice(0, 10)}
        </h6>
        <p className='card-text'>{f.description}</p>
        <button
          type='submit'
          value={f.id}
          className='btn btn-success resolve-btn'
          onClick={resolveFeedback}
        >
          Resolve
        </button>
      </div>
    </div>
  );
};

const Forums = () => {
  const [feedback, setFeedback] = useState(null);

  const fetchFeedback = () => {
    getFeedback()
      .then((data) => {
        setFeedback(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  return (
    <div className='mid-content'>
      {/* {success && (
        <div className='form-group form-fields'>
          <div class='alert alert-success form-control' role='alert'>
            {success}
          </div>
        </div>
      )}

      {error && (
        <div className='form-group form-fields'>
          <div class='alert alert-danger form-control' role='alert'>
            {error}
          </div>
        </div>
      )} */}
      <div>
        <div className='page-heading-container pb-4'>
          <h1>Forums</h1>
        </div>
        {feedback ? (
          feedback && feedback.map((f, i) => <Card key={i} f={f} />)
        ) : (
          <h1>No feedbacks found</h1>
        )}
      </div>
    </div>
  );
};

export default Forums;
