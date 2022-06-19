import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getListQuestCount,
  getListSolvedQuestCount,
  resetListProgress,
} from '../admin';
import { isAuthenticated } from '../auth';

const Lists = ({ id, name, description, userId, author }) => {
  const navigate = useNavigate();

  const { token } = isAuthenticated();

  const [Count, setCount] = useState(0);
  const [SolvedCount, setSolvedCount] = useState(0);

  const getQuestCount = (id) => {
    getListQuestCount(id)
      .then((data) => {
        console.log(data.message.count);
        setCount(data.message.count);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSolvedQuestCount = (uid, id, token) => {
    console.log('THE TOKEN IS ', token);

    getListSolvedQuestCount(uid, id, token)
      .then((data) => {
        console.log(data.message.count);
        setSolvedCount(data.message.count);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resetProgress = () => {
    if (window.confirm('Are you sure you want to reset user progress?')) {
      resetListProgress(userId, id, token)
        .then((data) => {
          console.log(data);
          window.location.reload(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log('not reseting progress');
    }
  };

  const [progress, setProgress] = useState(0);

  const getProgress = (solved, total) => {
    let percentage = (solved * 100) / total;
    console.log('percentage is ', percentage);
    setProgress(parseInt(percentage));
    console.log(progress);
  };

  useEffect(() => {
    getQuestCount(id);
    getSolvedQuestCount(userId, id, token);
    getProgress(SolvedCount, Count);
  }, [progress, Count, SolvedCount]);

  const handleSolveClick = (e) => {
    navigate(`/lists/${e.target.value}`);
  };

  return (
    <div className='card list-card border-warning mb-3'>
      <div className='card-header'>
        <h3> {name} </h3>
      </div>
      <div className='container-fluid card-body-outer-container'>
        <div className='row card-row'>
          <div className='card-body card-body-container text-warning col-md-8'>
            <div className='card-body-text-inner-container'>
              <h5 className='card-title'> Total Questions: {Count} </h5>
              {/* <h5 className='card-title'> List Author: {author} </h5> */}
              <p className='card-text'> {description} </p>
            </div>
          </div>
          <div className='button-container col-md-4'>
            <div className='inner-button-container'>
              <button
                type='button'
                onClick={handleSolveClick}
                value={id}
                name='startButton'
                className='btn btn-success'
              >
                Start solving
              </button>
              {/* <form action="/reset-list-progress" method="POST"> */}
              {/* <input type="text" defaultValue="<%= item.questionSet %>" name="list" hidden /> */}
              <button
                type='button'
                className='btn btn-danger'
                onClick={resetProgress}
              >
                Reset progress
              </button>
              {/* </form> */}
              {/* <button type="button" className="btn btn-primary" disabled>About this list</button> */}
              <div className='progress-border'>
                <div className='progress-bar' style={{ width: `${progress}%` }}>
                  {' '}
                  <span className='progress-text'>{progress}%</span>{' '}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lists;
