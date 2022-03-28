// import Auth from "./components/auth/auth";
import Signin from "./components/auth/signin";
import Signup from "./components/auth/signup";
import Dashboard from "./components/dashboard";
import Front from "./components/front/front";
import Footer from "./components/partials/footer";
import Header from "./components/partials/header";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminDashboard from "./components/admin/adminDashboard";
import PrivateRoute from "./components/auth/PrivateRoutes";
import AdminRoute from "./components/auth/AdminRoutes";
import AddList from "./components/admin/addList";
import AddTopic from "./components/admin/addTopic";
import AddQuest from "./components/admin/addQuest";
import ManageTopic from "./components/admin/manageTopic";
import ManageList from "./components/admin/manageList";
import ManageQuest from "./components/admin/manageQuest";
import EditList from "./components/admin/editList";
import EditTopic from "./components/admin/editTopic";
import EditQuest from "./components/admin/editQuest";
import Quests from "./components/quests/quests";
import Error from "./components/404 page/error";
import NoListError from "./components/404 page/nolist";


function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route path="/" exact element={<Front/>} />
      <Route path="/signin" exact element={<Signin/>} />
      <Route path="/signup" exact element={<Signup/>} />
      <Route path="*" element={<Error/>} />
      {/* <Route path="/nolist" element={<NoListError/>} /> */}
      
      <Route element={<PrivateRoute />}>
      <Route path="/lists" exact element={<><Header /><Dashboard /><Footer /></>} />
      <Route path="/lists/:listId" exact element={<><Header /><Quests /><Footer /></>} />
      </Route>
      
      <Route element={<AdminRoute />}>
      <Route path="/admin" exact element={<><Header /><AdminDashboard /><Footer /></>} />
      <Route path="/admin/add-list" exact element={<><Header /><AddList /><Footer /></>} />
      <Route path="/admin/add-topic" exact element={<><Header /><AddTopic /><Footer /></>} />
      <Route path="/admin/add-quest" exact element={<><Header /><AddQuest /><Footer /></>} />
      <Route path="/admin/manage-topic" exact element={<><Header /><ManageTopic /><Footer /></>} />
      <Route path="/admin/manage-list" exact element={<><Header /><ManageList /><Footer /></>} />
      <Route path="/admin/manage-quest" exact element={<><Header /><ManageQuest /><Footer /></>} />
      <Route path="/admin/edit-list/:listId" exact element={<><Header /><EditList /><Footer /></>} />
      <Route path="/admin/edit-topic/:topicId" exact element={<><Header /><EditTopic /><Footer /></>} />
      <Route path="/admin/edit-quest/:questId" exact element={<><Header /><EditQuest /><Footer /></>} />
      </Route>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
