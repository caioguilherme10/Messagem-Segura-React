import React from 'react';
//import PropTypes from 'prop-types';
import Menu from './menu';
import BarUsuarios from './bar-usuarios';
import Chat from './chat';
import InputChat from './input-chat';
import ButtonChat from './button-chat';

function PrincipalConteiner({name, email , handleClick , nameU, handleClickU, listaChat, nomeChat, inpBut, value, AlterarM, handleClickC}){
    return (
        <div> 
            <div>
                <Menu name={name} email={email} handleClick={handleClick}/>
            </div>
            <div className="row">
                <div className="col s6">
                    <BarUsuarios nameU={nameU} handleClickU={handleClickU}/>
                </div>
                <div className="col s6">
                    <div className="row">
                        <h3>{nomeChat}</h3>
                        {!!inpBut && <Chat listaChat={listaChat}/>}
                    </div>
                    <div className="row">
                        <div className="col s9">
                            {!!inpBut && <InputChat value={value} AlterarM={AlterarM}/>}
                        </div>
                        <div className="col s3">
                            {!!inpBut && <ButtonChat handleClickC={handleClickC}/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default PrincipalConteiner;