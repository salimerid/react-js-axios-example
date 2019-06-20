import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => (
    <div className="navbar-wrapper">
        <nav className="navbar navbar-inverse navbar-static-top">
            <div className="container">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed"
                            data-toggle="collapse" data-target="#navbar"
                            aria-expanded="false" aria-controls="navbar">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <Link className="navbar-brand" to='/create'>Stories</Link>
                </div>
                <div id="navbar" className="navbar-collapse collapse">
                    <ul className="nav navbar-nav">
                        <li ><Link to='/'>Home</Link></li>
                        <li ><Link to='/create'>Create Story</Link></li>
                        <li ><Link to='/search'>Search</Link></li>
                        <li ><a href="#" onClick={() => {sessionStorage.removeItem('token'); window.location = '/login'}}>Logout</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
);

export default Header;