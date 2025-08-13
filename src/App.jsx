import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link } from 'react-router-dom'
import { supabase } from './client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';




//pages
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import Homepage from './pages/Homepage'
import Postpage from './pages/postPage'

//components
import Navbar from './components/Navbar';

function App() {
  const [count, setCount] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')


  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  console.log(searchTerm);

  return (
    <>
{/*     
    <h1>Final Project</h1> */}
  <div className="App">
  
    <Router>
      <div>
      {/* Navbar at the top */}
        <Navbar onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<Homepage searchTerm={searchTerm}/>} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/post/:id" element={<Postpage />} />
        <Route path="/edit/:id" element={<EditPost />} />
        {/* <Route path="/item/:id" element={<ItemDetails />} /> */}
      </Routes>
      </div>
    </Router>
  </div>
    </>
  );
}
export default App

//What App.jsx looks like from crewmates project
    // import { useState } from 'react'
    // import './App.css'
    // import Sidebar from './components/Sidebar';
    // import { Outlet } from 'react-router-dom';

    // function App() {
    //   return (
    //     <div className="test" style={{ display: 'flex' }}>
    //       <Sidebar />
    //       <div style={{ marginLeft: '100px', marginTop: '20px', padding: '20px', width: '100%' }}>
    //         <Outlet />
    //       </div>
    //     </div>
    //   );
    // }

    // export default App;

//code from App.jsx from lab7
    // import './App.css';
    // import React from 'react';
    // import { useRoutes } from 'react-router-dom'
    // import ReadPosts from './pages/ReadPosts'
    // import CreatePost from './pages/CreatePost'
    // import EditPost from './pages/EditPost'
    // import { Link } from 'react-router-dom'


    // const App = () => {
      
    //   const descr = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'

    //   const posts = [
    //       {'id':'1', 
    //       'title': 'Cartwheel in Chelsea 🤸🏽‍♀️',
    //       'author':'Harvey Milian', 
    //       'description': descr},
    //       {'id':'2', 
    //       'title': 'Love Lock in Paris 🔒',
    //       'author':'Beauford Delaney', 
    //       'description':descr},
    //       {'id':'3', 
    //       'title': 'Wear Pink on Fridays 🎀',
    //       'author':'Onika Tonya', 
    //       'description':descr},
    //       {'id':'4', 
    //       'title': 'Adopt a Dog 🐶',
    //       'author':'Denise Michelle', 
    //       'description':descr},
    //   ]


    //   // Sets up routes
    //   let element = useRoutes([
    //     {
    //       path: "/",
    //       element:<ReadPosts data={posts}/>
    //     },
    //     {
    //       path:"/edit/:id",
    //       element: <EditPost data={posts} />
    //     },
    //     {
    //       path:"/new",
    //       element: <CreatePost />
    //     }
    //   ]);

    //   return ( 

    //     <div className="App">

    //       <div className="header">
    //         <h1>👍 Bet 1.0</h1>
    //         <Link to="/"><button className="headerBtn"> Explore Challenges 🔍  </button></Link>
    //         <Link to="/new"><button className="headerBtn"> Submit Challenge 🏆 </button></Link>
    //       </div>
    //         {element}
    //     </div>

    //   )
    // }

    // export default App