import { createBrowserRouter, RouterProvider } from "react-router-dom";
import  Login from "./components/auth/Login";
import  SignUp from "./components/auth/SignUp";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetUp from "./components/admin/CompanySetUp";
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from "./components/admin/PostJob";
import Applicants from "./components/admin/Applicants";
import ProtectedRoute from "./components/admin/ProtectedRoute";

// create the Route by using createBrowserRouter
// CreateBrowserRouter givees an array of objects in object it takes path and element, according to path
const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },{
    path:'/login',
    element:<Login/>
  },{
    path:'/signup',
    element:<SignUp/>
  },{
    path:'/jobs',
    element:<Jobs/>
  },{
    path:'/description/:id',
    element:<JobDescription/>
  },{
    path:'/browse',
    element:<Browse/>
  },{
    path:'/profile',
    element:<Profile/>
  },

// routes for admin and set thm protected

{
  path:'/admin/companies',
  element:<ProtectedRoute><Companies/></ProtectedRoute>
  
},
{
  path:'/admin/companies/create',
  element:<ProtectedRoute><CompanyCreate/></ProtectedRoute>
},
{
  path:'/admin/companies/:id',
  element:<ProtectedRoute><CompanySetUp/></ProtectedRoute>
},

// Routes for job created by admin
{
  path:'/admin/jobs',
  element:<ProtectedRoute><AdminJobs/></ProtectedRoute>
},
{
  path:'/admin/jobs/create',
  element:<ProtectedRoute><PostJob/></ProtectedRoute>
},
{
  path:'/admin/jobs/:id/applicants',
  element:<ProtectedRoute><Applicants/></ProtectedRoute>
}

])

function App() {
  return (
    <>
    <RouterProvider router={appRouter}/>
    </>
  );
}

export default App;
