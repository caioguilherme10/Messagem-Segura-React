import React from 'react';
//import PropTypes from 'prop-types';
import NavBarC from './navbarC';
import FormC from './formC';

function CadastroConteiner({senha, nome, email, handleSubmit, handleChangeN, handleChangeE, handleChangeS}){
    return (
        <div> 
            <div className="navbar-fixed">
                <NavBarC/>
            </div>
            <div className="container">
                <div className="row">
                    <FormC nome={nome} email={email} senha={senha} handleSubmit={handleSubmit} handleChangeN={handleChangeN} handleChangeE={handleChangeE} handleChangeS={handleChangeS}/>
                </div>
            </div>
        </div>
    );
}
export default CadastroConteiner;