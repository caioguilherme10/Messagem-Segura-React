import React from 'react';
//import PropTypes from 'prop-types';
import NavBar from './navbar';
import Login from './login';

function AppConteiner({ email, senha , handleChangeE, handleChangeS, handleSubmit}){
    return (
        <div> 
            <div className="navbar-fixed">
                <NavBar />
            </div>
            <div className="container">
                <Login email={email} senha={senha} handleChangeE={handleChangeE} handleChangeS={handleChangeS} handleSubmit={handleSubmit}/>
            </div>
        </div>
    );
}

export default AppConteiner;