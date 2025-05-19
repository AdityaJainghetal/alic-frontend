import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Sidbar/Layout';
import React from 'react';
import Course from './pages/Course';
import Banner from './pages/Banner';
import CourseDisplay from './pages/CourseDisplay';
import Bannerdisplay from './pages/Bannerdisplay';
import QueryDisplay from './pages/QueryDisplay';
import SuccessStory from './pages/SuccessStory';
import SucessStroydisplay from './pages/SucessStroydisplay';
import CategoryManagement from './pages/CategoryManagement';
import EnquiryDisplay from './pages/EnquiryDisplay';
import ContactDisplay from './pages/Contact/ContactDisplay';
import EnrollDisplay from './pages/Enroll/EnrollDisplay';
import WhatsNew from './pages/WhatsNew/WhatsNew';
import DisplayWhatsNew from './pages/WhatsNew/DisplayWhatsNew';
import Blog from './pages/Blog';
import BlogDisplay from './pages/BlogDisplay';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
        <Route path="/courses" element={<Course/>}/>
        <Route path='/banner' element={<Banner/>}/>
        <Route path='/allcourse' element={<CourseDisplay/>}/>
        <Route path='/allbanner' element={<Bannerdisplay/>}/>
        <Route path='/allquerydisplay' element={<QueryDisplay/>}/>
        <Route path="/sucessStory"  element={<SuccessStory/>}/>
        <Route path="/sucessStorydisplay" element={<SucessStroydisplay/>}/>
           <Route path="/categories" element={<CategoryManagement/>} />
           <Route path='/enquirydisplay' element={<EnquiryDisplay/>}/>
           <Route path='/contactdisplay' element={<ContactDisplay/>}/>
           <Route path='/enroll' element={<EnrollDisplay/>}/>
           <Route path='/whatsnew' element={<WhatsNew/>}/>
           <Route path='/whatsnewdisplay' element={<DisplayWhatsNew/>}/>
           <Route path='/blog'  element={<Blog/>}/>
           <Route path='/blogdisplay' element={<BlogDisplay/>}/>


        
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
