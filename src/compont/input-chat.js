import React from 'react';
//import PropTypes from 'prop-types';

function InputChat({value, AlterarM}) {
    return (
        <label>
            <input type="text" value={value} onChange={(e) => AlterarM(e.target.value)} className="validate"/>
        </label>
    );
}
export default InputChat;