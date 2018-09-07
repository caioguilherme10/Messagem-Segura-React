import React from 'react';
//import PropTypes from 'prop-types';

function FormC({senha, nome, email, handleSubmit, handleChangeN, handleChangeE, handleChangeS}) {
    return (
        <form className="col s12" onSubmit={handleSubmit}>
			<div className="row">
                <label>Nome: 
                    <input type="text" value={nome} onChange={handleChangeN} className="validate"/>
                </label>
			</div>
			<div className="row">
                <label>Email: 
                    <input type="email" value={email} onChange={handleChangeE} className="validate"/>
                </label>
			</div>
			<div className="row">
                <label>Senha: 
                    <input type="text" value={senha} onChange={handleChangeS} className="validate"/>
                </label>
			</div>
            <br/>
			<div className="row center-align">
                <input type="submit" value="Salvar" />
			</div>
		</form>
    );
}


export default FormC;