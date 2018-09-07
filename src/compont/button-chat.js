import React from 'react';
//import PropTypes from 'prop-types';

function ButtonChat({handleClickC}) {
    return (
        <a onClick={() => handleClickC()} className="waves-effect waves-light btn">button</a>
    );
}
export default ButtonChat;