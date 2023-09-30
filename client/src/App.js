import React from "react";
import {Routes,Route} from 'react-router-dom'
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import AboutPage from './pages/AboutPage'
import MyListingPage from "./pages/MyListingPage";
import ProfilePage from "./pages/ProfilePage";
import AddListingPage from "./pages/AddListingPage";
import SignupPage from "./pages/SignupPage";
import EditListing from "./pages/EditListing";
import PropertyDetails from "./pages/PropertyDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignupPage/>}/>
      <Route path="/about" element={<AboutPage/>}/>
      <Route path="/my-listings" element={<MyListingPage/>}/>
      <Route path="/my-listings/:id" element={<EditListing/>}/>
      <Route path="/profile" element={<ProfilePage/>}/>
      <Route path="/add-listing" element={<AddListingPage/>}/>
      <Route path="/property/:id" element={<PropertyDetails/>}/>
    </Routes>
  );
}

export default App;
