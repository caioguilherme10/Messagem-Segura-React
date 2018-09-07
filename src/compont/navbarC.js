import React from 'react';
//import PropTypes from 'prop-types';

function NavBarC() {
    return (
        <nav>
            <div className="nav-wrapper teal darken-2">
                <a href="/" className="button-collapse show-on-large left col s6"><i className="material-icons col s6">replay</i></a>
                <a href="/cadastro" className="brand-logo center col s6">Cadastro</a>
			</div>
        </nav>
    );
}


export default NavBarC;