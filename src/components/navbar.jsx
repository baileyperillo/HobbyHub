//create the navbar
//should have title, search bar, homepage tab, create post tab
//should also stay on the top

import { supabase } from '../client'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'


const Navbar = ({ onSearch }) => {
    const [inputValue, setInputValue] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Searching for:", inputValue.trim());
        onSearch(inputValue.trim());
    };

    return (
        <nav className = "navbar">
        <div className="navbar-left">
            <Link to="/" className="site-title">HobbyHub</Link>
        </div>
        <div className= "search-container">
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="Search posts"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                />
                <button type="submit" className="search-btn">Search</button>
            </form>
        </div>
        
        <div className="navbar-right">
            <Link to="/" className="nav-button">Home</Link>
            {/* <Link to="/" className="nav-button">About</Link> */}
            <Link to="/create" className="nav-button">Create Post</Link>
      </div>
        </nav>
    );
};

export default Navbar;
