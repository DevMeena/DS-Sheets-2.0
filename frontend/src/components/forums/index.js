import * as Axios from 'axios';
import { API } from '../../api';

export const getFeedback = async () => {
  try {
    const response = await Axios.get(`${API}/feedbacks`);
    return response.data;
  } catch (err) {
    return err.message;
  }
};

export const submitFeedback = async (title, description, username) => {
  try {
    const response = await Axios.post(`${API}/feedback`, {
      title,
      description,
      username,
    });
    return { success: true, message: response.data };
  } catch (err) {
    const message = err.response.data;
    return { success: false, message: message };
  }
};

export const deleteFeedback = async (fid) => {
  try {
    const response = await Axios.delete(`${API}/feedback/${fid}`);
    return { success: true, message: response.data };
  } catch (err) {
    const message = err.response.data;
    return { success: false, message: message };
  }
};
