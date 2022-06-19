const { db } = require('../models/db');
const { v4: uuidv4 } = require('uuid');

exports.getFeedbacks = async (req, res) => {
  await db.query('SELECT * FROM forums', (err, doc) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        err: 'Error in fetching feedbacks!',
      });
    } else {
      if (doc.length) {
        // console.log(doc);
        return res.status(200).json(doc);
      } else {
        console.log(err);
        return res.status(400).json({
          err: 'failed to fetch feedbacks',
        });
      }
    }
  });
};

exports.submitFeedback = async (req, res) => {
  console.log(req.body);

  const id = uuidv4();
  const { username, description, title } = req.body;
  console.log(id);

  var date = new Date();
  const time = date.toISOString().split('T')[0];

  //   console.log(FROM_UNIXTIME(dateSeconds));

  await db.query(
    'INSERT INTO forums (id, title, description, time, username) VALUES (?,?,?,?,?)',
    [id, title, description, time, username],
    (err, doc) => {
      if (err) {
        return res.status(400).json({
          message: 'Error in submitting feedback!',
        });
      } else {
        console.log(doc);
        return res.status(200).json({
          message: 'Successfully submitted feedback!',
        });
      }
    }
  );
};

exports.deleteFeedback = async (req, res) => {
  const fid = req.params.fid;

  console.log('feedback id is : ', fid);

  await db.query('DELETE FROM dsadb.forums WHERE id = ?', [fid], (err, doc) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        message: 'error in resolving feedback!',
      });
    } else {
      console.log(doc);
      return res.status(200).json({
        message: 'feedback resolved successfully!',
      });
    }
  });
};
