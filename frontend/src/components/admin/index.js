import Axios from "axios";
import { API } from "../../api";

export const addList = async (name, author, description, token, uid) => {

    try {
        const response = await Axios.post(`${API}/admin/${uid}/add-list`, {name, author, description}, { headers: {"Authorization" : `Bearer ${token}`} })
        return {success: true, message: response.data}

      } catch (err) {
        const message = err.response.data
        return {success: false, message: message}
      }

}

export const addTopic = async (name, token, uid) => {

    try {
        const response = await Axios.post(`${API}/admin/${uid}/add-topic`,{name}, { headers: {"Authorization" : `Bearer ${token}`} })
        return {success: true, message: response.data}

      } catch (err) {
        const message = err.response.data
        return {success: false, message: message}
      }

}

export const addQuest = async (name, link, listId, topicId, token, uid) => {

    console.log(name, link, listId, topicId);

    try {
        const response = await Axios.post(`${API}/admin/${uid}/add-quest`, {name, link, listId, topicId}, { headers: {"Authorization" : `Bearer ${token}`} })
        console.log(response);
        return {success: true, message: response.data}

      } catch (err) {
        const message = err.response.data
        console.log(err);
        return {success: false, message: message}
      }

}

export const getLists = async () => {
    try {
        const response = await Axios.get(`${API}/lists`)
        return response.data;
    } catch (err) {
        return err.message;
    }
}

export const getTopics = async () => {
    try {
        const response = await Axios.get(`${API}/topics`)
        return response.data;
    } catch (err) {
        return err.message;
    }
}

export const getListQuests = async (listId) => {
  try {
    const response = await Axios.get(`${API}/list/${listId}`)
    return {success: true, message: response.data}
} catch (err) {
    const message = err.response.data
    return {success: false, message: message}
}
}

export const editList = async (listId,values, token, uid) => {

  try {
      const response = await Axios.patch(`${API}/admin/${uid}/edit-list/${listId}`, values, { headers: {"Authorization" : `Bearer ${token}`} })
      return {success: true, message: response.data}

    } catch (err) {
      const message = err.response.data
      return {success: false, message: message}
    }

}

export const editTopic = async (topicId,values, token, uid) => {

  try {
      const response = await Axios.patch(`${API}/admin/${uid}/edit-topic/${topicId}`, values, { headers: {"Authorization" : `Bearer ${token}`} })
      return {success: true, message: response.data}

    } catch (err) {
      const message = err.response.data
      return {success: false, message: message}
    }

}

export const editQuest = async (questId,values, token, uid) => {

  try {
      const response = await Axios.patch(`${API}/admin/${uid}/edit-quest/${questId}`, values, { headers: {"Authorization" : `Bearer ${token}`} })
      return {success: true, message: response.data}

    } catch (err) {
      const message = err.response.data
      return {success: false, message: message}
    }

}

// gets a single list info

export const getList = async (listId) => {
  try {
      const response = await Axios.get(`${API}/lists/${listId}`)

      return {success: true, message: response.data};
  } catch (err) {
      return {success: false, message: err.message};
  }
}

export const deleteList = async (listId, token, uid) => {

  try {
      const response = await Axios.delete(`${API}/admin/${uid}/delete-list/${listId}`, { headers: {"Authorization" : `Bearer ${token}`} })
      return {success: true, message: response.data}

    } catch (err) {
      const message = err.response.data
      return {success: false, message: message}
    }

}

export const deleteQuest = async (questId, token, uid) => {

  try {
      const response = await Axios.delete(`${API}/admin/${uid}/delete-quest/${questId}`, { headers: {"Authorization" : `Bearer ${token}`} })
      return {success: true, message: response.data}

    } catch (err) {
      const message = err.response.data
      return {success: false, message: message}
    }

}

export const deleteTopic = async (topicId, token, uid) => {

  try {
      const response = await Axios.delete(`${API}/admin/${uid}/delete-topic/${topicId}`, { headers: {"Authorization" : `Bearer ${token}`} })
      return {success: true, message: response.data}

    } catch (err) {
      const message = err.response.data
      return {success: false, message: message}
    }

}

export const getUserListQuests = async (listId,userId,topicId,token) => {
  try {
    const response = await Axios.get(`${API}/${userId}/list/${listId}/${topicId}`,{ headers: {"Authorization" : `Bearer ${token}`} })
    return {success: true, message: response.data}
} catch (err) {
    const message = err.response.data
    return {success: false, message: message}
}
}


export const submitQuestion = async (submission) => {
  console.log(submission);
  try {
    const response = await Axios.post(`${API}/submit`,submission)
    console.log(response);
    return {success: true, message: response.data}
} catch (err) {
    const message = err.response.data
    return {success: false, message: message}
}
}

// ${API}/submit

export const getListQuestCount = async (lid) => {
  try {
    const response = await Axios.get(`${API}/count/${lid}`)
    console.log(response);
    return {success: true, message: response.data}
} catch (err) {
    const message = err.response.data
    return {success: false, message: message}
}
}


export const getListSolvedQuestCount = async (uid,lid,token) => {
  console.log("The token is ", token);
  try {
    const response = await Axios.get(`${API}/solved-count/${uid}/${lid}`,{ headers: {"Authorization" : `Bearer ${token}`} })
    console.log(response);
    return {success: true, message: response.data}
} catch (err) {
    const message = err.response.data
    return {success: false, message: message}
}
}

export const resetUserProgress = async (userId,token) => {

  try {
      const response = await Axios.delete(`${API}/reset-progress/${userId}`,{ headers: {"Authorization" : `Bearer ${token}`} })
      return {success: true, message: response.data}

    } catch (err) {
      const message = err.response.data
      return {success: false, message: message}
    }

}

export const deleteUserAccount = async (userId,token) => {

  console.log("DELETE USER ACCOUNT");

  try {
      const response = await Axios.delete(`${API}/delete-user/${userId}`,{ headers: {"Authorization" : `Bearer ${token}`} })
      return {success: true, message: response.data}

    } catch (err) {
      const message = err.response.data
      return {success: false, message: message}
    }

}

export const resetListProgress = async (userId,listId,token) => {

  try {
      const response = await Axios.delete(`${API}/reset-progress/${userId}/${listId}`,{ headers: {"Authorization" : `Bearer ${token}`} })
      return {success: true, message: response.data}
    } catch (err) {
      const message = err.response.data
      return {success: false, message: message}
    }

}