import React from 'react'
import { useNavigate } from 'react-router-dom'
// import '../master.css'

const AdminDashboard = () => {

  const navigate = useNavigate();

  const handleAddList = () => {
    navigate("/admin/add-list")
  }

  const handleAddQuest = () => {
    navigate("/admin/add-quest")
  }

  const handleAddTopic = () => {
    navigate("/admin/add-topic")
  }

  const handleManageLists = () => {
    navigate("/admin/manage-list")
  }

  const handleManageQuests = () => {
    navigate("/admin/manage-quest")
  }

  const handleManageTopics = () => {
    navigate("/admin/manage-topic")
  }

  return (
    <div className="mid-content">
    <div className="admin-button-area">
    <div className="admin-buttons"><button type="button" onClick={handleAddList} className="btn btn-outline-warning">Add New List</button></div>
    <div className="admin-buttons"><button type="button" onClick={handleAddQuest} className="btn btn-outline-warning">Add New Question</button></div>
    <div className="admin-buttons"><button type="button" onClick={handleAddTopic} className="btn btn-outline-warning">Add New Topic</button></div>
    <div className="admin-buttons"><button type="button" onClick={handleManageLists} className="btn btn-outline-warning">Manage Lists</button></div>
    <div className="admin-buttons"><button type="button" onClick={handleManageQuests} className="btn btn-outline-warning">Manage Questions</button></div>
    <div className="admin-buttons"><button type="button" onClick={handleManageTopics} className="btn btn-outline-warning">Manage Topics</button></div>
    </div>
    </div>
  )
}

export default AdminDashboard