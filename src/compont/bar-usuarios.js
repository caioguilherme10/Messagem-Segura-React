import React from 'react';
//import PropTypes from 'prop-types';

function BarUsuarios({nameU, handleClickU}) {
    return (
        <div className="collection">
            {nameU.map( (e, index) => (
                <a key={index} href="#!" onClick={() => handleClickU(e.name,e.keyPub,e.keyU)} className="collection-item">{e.name}</a>
            ))}
        </div>
    );
}
export default BarUsuarios;