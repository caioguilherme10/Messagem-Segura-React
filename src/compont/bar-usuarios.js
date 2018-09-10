import React from 'react';
//import PropTypes from 'prop-types';

function BarUsuarios({nameU, handleClickU}) {
    const dbRefObjec7 = window.firebase.database().ref();
    const dbRefObjec8 = window.firebase.database().ref();
    const dbRefList2 = dbRefObjec7.child('pessoas');
    const dbRefList3 = dbRefObjec8.child('message');
    return (
        <div className="collection">
            {nameU.map( (e, index) => (
                <a key={index} href="#!" onClick={() => handleClickU(e.name,e.keyPub,e.keyU,dbRefList2,dbRefList3)} className="collection-item">{e.name}</a>
            ))}
        </div>
    );
}
export default BarUsuarios;