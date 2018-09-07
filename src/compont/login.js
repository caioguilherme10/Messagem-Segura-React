import React from 'react';
//import PropTypes from 'prop-types';

function Login({ email, senha , handleChangeE, handleChangeS, handleSubmit}) {
    return (
        <div className="row">
            <form className="col s12" onSubmit={handleSubmit}>
				<label>Email: 
                    <input type="email" value={email} onChange={handleChangeE} className="validate"/>
                </label>
				<label>Senha:
                    <input type="password" value={senha} onChange={handleChangeS} className="validate" />
                </label>
                <br/>
			    <div className="row center-align">
				    {/*<a className="waves-effect waves-light btn teal darken-2" id="buttonSignIn">Login</a>*/}
                    <input type="submit" value="Login" />
			    </div>
            </form>
			<div className="row center-align">
				E novo?<a href="/cadastro"> Crie uma conta.</a>
            </div>
		</div>
    );
}


export default Login;