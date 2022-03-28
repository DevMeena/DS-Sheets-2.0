import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getTopics,
  getList,
  getUserListQuests,
  submitQuestion,
} from '../admin';
import { isAuthenticated } from '../auth';
import useWindowDimensions from './windowSize';

// ! too much to handle in this modeule

const breakpoints = {
  mobile: '(max-width:600px)',
  others: '(min-width:600px)',
};

const Quests = () => {
  const { height, width } = useWindowDimensions();
  const [topics, setTopics] = useState([]);
  const [quests, setQuests] = useState([]);
  const [list, setList] = useState([]);
  const { listId } = useParams();

  const [filteredList, setFilteredList] = useState([]);

  const [Filter, setFilter] = useState('all');
  const [topic, setTopic] = useState('all');

  // const [topicName, setTopicName] = useState("")

  const { token } = isAuthenticated();

  console.log(token);

  const uid = isAuthenticated().user.id;

  const fetchTopics = () => {
    getTopics()
      .then((data) => {
        setTopics(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchListQuests = (listId, uid, topic, token) => {
    getUserListQuests(listId, uid, topic, token)
      .then((data) => {
        if (data.success) {
          setQuests(data.message);
          console.log('this is filtered list');
          setFilteredList(data.message);
          console.log(data);
        } else {
          setQuests([]);
          setFilteredList([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const navigate = useNavigate();

  const fetchList = (lid) => {
    getList(lid)
      .then((data) => {
        console.log(data);
        if (data.success) {
          setList(data.message[0]);
          console.log(data.message[0]);
        } else {
          navigate('/error');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    console.log(Filter);
  };

  const handleTopicChange = (e) => {
    // e.preventDefault()

    setTopic(e.target.value);
    console.log(topic);

    fetchListQuests(listId, uid, topic, token);

    document.getElementById('btnradio1').checked = true;
  };

  // const handleFilter = e => {
  //   e.preventDefault()
  //   // ! probably won't need it

  //   const que = quests
  //   setFilteredList(que.filter(quest => quest))

  //   // setFilteredList(que.filter(quest => quest))

  //     if(Filter === "solved"){
  //       setFilteredList(que.filter(quest => quest.solved === 1))
  //     } else if(Filter === "unsolved"){
  //       setFilteredList(que.filter(quest => quest.solved === 0))
  //     } else if(Filter === "favourite"){
  //       setFilteredList(que.filter(quest => quest.favourite === 1))
  //     }  else if(Filter === "unfavourite"){
  //       setFilteredList(que.filter(quest => quest.favourite === 0))
  //     }
  // }

  const renderFilter = () => {
    return width >= 600 ? (
      <div
        className='btn-group form-fields'
        id='filter-buttons'
        role='group'
        aria-label='Basic radio toggle button group'
      >
        <input
          type='radio'
          className='btn-check'
          onChange={handleFilterAll}
          value='all'
          name='btnradio'
          id='btnradio1'
          autoComplete='off'
          defaultChecked
        />
        <label className='btn btn-outline-primary' htmlFor='btnradio1'>
          All
        </label>
        <input
          type='radio'
          className='btn-check'
          onChange={handleFilterSolve}
          value='solved'
          name='btnradio'
          id='btnradio2'
          autoComplete='off'
        />
        <label className='btn btn-outline-success' htmlFor='btnradio2'>
          Solved
        </label>
        <input
          type='radio'
          className='btn-check'
          onChange={handleFilterUnsolve}
          value='unsolved'
          name='btnradio'
          id='btnradio3'
          autoComplete='off'
        />
        <label className='btn btn-outline-danger' htmlFor='btnradio3'>
          Unsolved
        </label>
        <input
          type='radio'
          className='btn-check'
          onChange={handleFilterFavourite}
          value='favourite'
          name='btnradio'
          id='btnradio4'
          autoComplete='off'
        />
        <label className='btn btn-outline-info' htmlFor='btnradio4'>
          Favourite
        </label>
        <input
          type='radio'
          className='btn-check'
          onChange={handleFilterUnfavourite}
          value='unfavourite'
          name='btnradio'
          id='btnradio5'
          autoComplete='off'
        />
        <label className='btn btn-outline-warning' htmlFor='btnradio5'>
          Unfavourite
        </label>
      </div>
    ) : (
      <div
        className='btn-group-vertical phone-vertical-buttons'
        id='filter-buttons'
      >
        <input
          type='radio'
          className='btn-check'
          onChange={handleFilterAll}
          value='all'
          name='btnradio'
          id='btnradio1'
          autoComplete='off'
          defaultChecked
        />
        <label className='btn btn-outline-primary' htmlFor='btnradio1'>
          All
        </label>
        <input
          type='radio'
          className='btn-check'
          onChange={handleFilterSolve}
          value='solved'
          name='btnradio'
          id='btnradio2'
          autoComplete='off'
        />
        <label className='btn btn-outline-success' htmlFor='btnradio2'>
          Solved
        </label>
        <input
          type='radio'
          className='btn-check'
          onChange={handleFilterUnsolve}
          value='unsolved'
          name='btnradio'
          id='btnradio3'
          autoComplete='off'
        />
        <label className='btn btn-outline-danger' htmlFor='btnradio3'>
          Unsolved
        </label>
        <input
          type='radio'
          className='btn-check'
          onChange={handleFilterFavourite}
          value='favourite'
          name='btnradio'
          id='btnradio4'
          autoComplete='off'
        />
        <label className='btn btn-outline-info' htmlFor='btnradio4'>
          Favourite
        </label>
        <input
          type='radio'
          className='btn-check'
          onChange={handleFilterUnfavourite}
          value='unfavourite'
          name='btnradio'
          id='btnradio5'
          autoComplete='off'
        />
        <label className='btn btn-outline-warning' htmlFor='btnradio5'>
          Unfavourite
        </label>
      </div>
    );
  };

  const handleFilterAll = (e) => {
    // let que = quests
    setFilteredList(quests.filter((quest) => quest));
  };

  const handleFilterSolve = (e) => {
    // let que = quests
    setFilteredList(quests.filter((quest) => quest.solved === 1));
  };

  const handleFilterUnsolve = (e) => {
    // let que = quests
    setFilteredList(quests.filter((quest) => quest.solved === 0));
  };

  const handleFilterFavourite = (e) => {
    // let que = quests
    setFilteredList(quests.filter((quest) => quest.favourite === 1));
  };

  const handleFilterUnfavourite = (e) => {
    // let que = quests
    setFilteredList(quests.filter((quest) => quest.favourite === 0));
  };

  const [submission, setSubmission] = useState({
    sol: 0,
    fav: 0,
    unsol: 0,
    unfav: 0,
    qid: '',
    lid: '',
    uid: '',
  });

  const submitSubmission = (sub) => {
    submitQuestion(sub)
      .then((data) => {
        if (data) {
          console.log(data);
        } else {
          console.log(data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleSolve = (e) => {
    console.log(e.target.value);
    if (e.target.checked) {
      setSubmission({
        fav: 0,
        unfav: 0,
        unsol: 0,
        sol: 1,
        qid: e.target.value,
        lid: listId,
        uid: uid,
      });
      // submitSubmission(submission)
      submitSubmission({
        fav: 0,
        unfav: 0,
        unsol: 0,
        sol: 1,
        qid: e.target.value,
        lid: listId,
        uid: uid,
      });
    }
    console.log(submission);
  };

  const handleUnsolve = (e) => {
    console.log(e.target.value);
    if (e.target.checked) {
      setSubmission({
        fav: 0,
        unfav: 0,
        unsol: 1,
        sol: 0,
        qid: e.target.value,
        lid: listId,
        uid: uid,
      });
      // submitSubmission(submission)
      submitSubmission({
        fav: 0,
        unfav: 0,
        unsol: 1,
        sol: 0,
        qid: e.target.value,
        lid: listId,
        uid: uid,
      });
    }
    console.log(submission);
  };

  const handleFavourite = (e) => {
    console.log(e.target.value);
    if (e.target.checked) {
      setSubmission({
        fav: 1,
        unfav: 0,
        unsol: 0,
        sol: 0,
        qid: e.target.value,
        lid: listId,
        uid: uid,
      });
      // submitSubmission(submission)
      submitSubmission({
        fav: 1,
        unfav: 0,
        unsol: 0,
        sol: 0,
        qid: e.target.value,
        lid: listId,
        uid: uid,
      });
    }
    console.log(submission);
  };

  const handleUnfavourite = (e) => {
    console.log(e.target.value);
    if (e.target.checked) {
      setSubmission({
        fav: 0,
        unfav: 1,
        unsol: 0,
        sol: 0,
        qid: e.target.value,
        lid: listId,
        uid: uid,
      });
      // submitSubmission(submission)
      submitSubmission({
        fav: 0,
        unfav: 1,
        unsol: 0,
        sol: 0,
        qid: e.target.value,
        lid: listId,
        uid: uid,
      });
    }
    console.log(submission);
  };

  useEffect(() => {
    fetchTopics();
    fetchList(listId);
    fetchListQuests(listId, uid, topic, token);
  }, [topic, submission]);

  return (
    <div className='mid-content'>
      <div className='quest-page-middlearea-div'>
        <div className='page-heading-container'>
          <h1> {list.name} </h1>
        </div>
        <div className='quest-main-area'>
          <div className='forms-area-question'>
            <div className='form-group form-fields'>
              <select
                className='form-control'
                onChange={handleTopicChange}
                name='topicID'
                id='exampleFormControlSelect1'
              >
                <option value='all'> Topic (all) </option>
                {/* map here */}
                {topics &&
                  topics.map((topic) => {
                    return <option value={topic.id}> {topic.name} </option>;
                  })}
              </select>
            </div>
            {/* 
          <form>
            <div className="form-group form-fields">    
           
              <select className="form-control" onChange={handleFilterChange} name="optionID" id="exampleFormControlSelect1">
                <option value="all"> Filter (all) </option>

                <option value="solved"> Solved </option>
                <option value="unsolved"> Unsolved </option>
                <option value="favourite"> Favourite </option>
                <option value="unfavourite"> Unfavourite </option>
              
              </select>
            </div>
            
            <div className="form-fields questions-button">
              <button type="submit" onClick={handleFilter} className="btn btn-success mb-2">Filter</button>
            </div>
          </form> 
*/}
            {/* <div className="btn-group-vertical" id='filter-buttons'>
      <div className="btn-group form-fields" id='filter-buttons' role="group" aria-label="Basic radio toggle button group">
        <input type="radio" className="btn-check" onChange={handleFilterAll} value="all" name="btnradio" id="btnradio1" autoComplete="off" defaultChecked />
        <label className="btn btn-outline-primary" htmlFor="btnradio1">All</label>
        <input type="radio" className="btn-check" onChange={handleFilterSolve} value="solved" name="btnradio" id="btnradio2" autoComplete="off" />
        <label className="btn btn-outline-success" htmlFor="btnradio2">Solved</label>
        <input type="radio" className="btn-check" onChange={handleFilterUnsolve} value="unsolved" name="btnradio" id="btnradio3" autoComplete="off" />
        <label className="btn btn-outline-danger" htmlFor="btnradio3">Unsolved</label>
        <input type="radio" className="btn-check" onChange={handleFilterFavourite} value="favourite" name="btnradio" id="btnradio4" autoComplete="off" />
        <label className="btn btn-outline-info" htmlFor="btnradio4">Favourite</label>
        <input type="radio" className="btn-check" onChange={handleFilterUnfavourite} value="unfavourite" name="btnradio" id="btnradio5" autoComplete="off" />
        <label className="btn btn-outline-warning" htmlFor="btnradio5">Unfavourite</label>
      </div>
  </div> */}

            <br></br>

            {renderFilter()}
          </div>

          <br></br>

          {/* TRY TO DO THIS ONE TOO */}

          {/*         
        <div className="page-subheading-container">
          <h6 className="solvedCounter"> Solved: 69 </h6>
          <h6 className="filterResults"> Topic: Array </h6> 
        </div> */}

          <div className='outer-table-quest-area'>
            <div className='table-responsive table-area'>
              <table className='table table-striped table-dark bordered-table'>
                <thead>
                  <tr>
                    <th scope='col'>✔️</th>
                    <th scope='col'>Questions</th>
                    <th scope='col'>❤️</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList &&
                    filteredList.map((quest) => (
                      <>
                        <tr>
                          {quest.solved === 1 && (
                            <th scope='row'>
                              {' '}
                              <input
                                className='form-check-input checkbox-solved'
                                type='checkbox'
                                name='checkboxunSolved'
                                value={quest.id}
                                onChange={handleUnsolve}
                                id='flexCheckDefault'
                              />{' '}
                            </th>
                          )}
                          {quest.solved === 0 && (
                            <th scope='row'>
                              {' '}
                              <input
                                className='form-check-input checkbox-unsolved'
                                type='checkbox'
                                name='checkboxSolved'
                                value={quest.id}
                                onChange={handleSolve}
                                id='flexCheckDefault'
                              />{' '}
                            </th>
                          )}

                          {quest.solved === 1 && (
                            <td>
                              {' '}
                              <a
                                href={quest.link}
                                target='_blank'
                                style={{ color: 'gold' }}
                              >
                                {' '}
                                {quest.name}{' '}
                              </a>{' '}
                            </td>
                          )}
                          {quest.solved === 0 && (
                            <td>
                              {' '}
                              <a href={quest.link} target='_blank'>
                                {' '}
                                {quest.name}{' '}
                              </a>{' '}
                            </td>
                          )}

                          {quest.favourite === 1 && (
                            <td>
                              {' '}
                              <input
                                className='form-check-input checkbox-favourite'
                                name='checkboxunFavourite'
                                type='checkbox'
                                value={quest.id}
                                onChange={handleUnfavourite}
                                id='flexCheckDefault'
                              />{' '}
                            </td>
                          )}
                          {quest.favourite === 0 && (
                            <td>
                              {' '}
                              <input
                                className='form-check-input checkbox-unfavourite'
                                name='checkboxFavourite'
                                type='checkbox'
                                value={quest.id}
                                onChange={handleFavourite}
                                id='flexCheckDefault'
                              />{' '}
                            </td>
                          )}
                        </tr>
                      </>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quests;
