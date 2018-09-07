import React from 'react';
//import PropTypes from 'prop-types';

function Menu({name, email, handleClick}) {
    return (
        <nav>
            <div className="nav-wrapper teal darken-2">
                <a href="" className="brand-logo left">Mensagem</a>
                <ul className="right">
                    <li><a>{name}</a></li>
                    <li><a>{email}</a></li>
                    <li><a onClick={handleClick}>Sair</a></li>
                </ul>
            </div>
        </nav>
    );
}

export default Menu;