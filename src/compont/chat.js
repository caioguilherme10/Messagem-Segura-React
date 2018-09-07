import React from 'react';
//import PropTypes from 'prop-types';

function Chat({ listaChat}) {
    return (
        <ul>
            {listaChat.map( (e, index) => (
                <li key={index} className="white col s12"><p className={e.tipo}>{e.messagem}</p></li>
            ))}
        </ul>
    );
}
export default Chat;