import React, { Component } from 'react';
import PrincipalConteiner from './compont/principal-conteiner';

class Principal extends Component {
    constructor (){
        super()
        this.state = {
            name: '',
            email: '',
            nameU: [],
            listaChat: [],
            nomeChat: '',
            keyPub: '',
            keyU: '',
            inpBut: false,
            keyS: '',
            keyR: '',
            value: '',
            keyPri: ''
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleClickU = this.handleClickU.bind(this);
        this.AlterarM = this.AlterarM.bind(this);
        this.handleClickC = this.handleClickC.bind(this);
        
    }

    async handleClickC(){

        const message = this.state.value
        const keyR = this.state.keyR
        const keyS = this.state.keyS

        await window.firebase.database().ref('pessoas/' + keyR).once('value').then(function(snapshot) {
            //var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
            // ...
            let encryptR = new window.JSEncrypt();
            encryptR.setPublicKey(snapshot.val().keyPub);
            let encryptedR = encryptR.encrypt(message);//encripted msg (receiver)
            window.firebase.database().ref('pessoas/' + keyS).once('value').then(function(snapshot) {
              let encryptS = new window.JSEncrypt();
              encryptS.setPublicKey(snapshot.val().keyPub);
              let encryptedS = encryptS.encrypt(message);
              window.firebase.database().ref('message/').push({
                keyS : keyS,
                keyR : keyR,
                messagemR : encryptedR,
                messagemS : encryptedS
              }).key;
            });
        });

        await this.setState({
            value: ''
        })
    }

    AlterarM(value){
        this.setState({
            value: value
        })
    }

    inserir (name , email, key) {
        this.setState({
            name: name,
            email: email,
            keyPri: key
        })
    }

    inserirU (nameU,nome,keyPub,keyU) {

        let obj = {
            name: nameU,
            nome: nome,
            keyPub: keyPub,
            keyU: keyU
        }

        let arr = this.state.nameU

        arr.push(obj)

        this.setState({
            nameU: arr,
        })
    }

    inserirL (tipo, messagem){
        let obj = {
            tipo: tipo,
            messagem: messagem
        }

        let arr = this.state.listaChat

        arr.push(obj)

        this.setState({
            listaChat: arr
        })
    }
    
    componentWillMount () {

        const { history } = this.props
        window.firebase.auth().onAuthStateChanged(firebaseUser =>{
          if(firebaseUser){

          }else{
            localStorage.setObject("usu", []);
            history.push('/')
          }
        });

        let array = localStorage.getObject("usu");

        const dbRefObjec = window.firebase.database().ref();

        const two = dbRefObjec.child('users').orderByChild('email').equalTo(array[0].email);

        const self = this

        two.on('child_added', snap => {

            self.inserir(snap.val().name, snap.val().email,snap.val().keyPri)

        });

        const dbRefList = dbRefObjec.child('pessoas');

        dbRefList.on('child_added', snap2 => {
        
            if(snap2.val().name === self.state.name){

            }else{
                self.inserirU(snap2.val().name,snap2.val().nome,snap2.val().keyPub,snap2.key)
            }
                        
        });

    }

    handleClick () {
        window.firebase.auth().signOut();
        localStorage.setObject("usu", []);
	    window.location.replace("/");
    }

    async handleClickU(nome,keyPub,keyU) {
        await this.setState({
            nomeChat: nome,
            keyPub: keyPub,
            keyU: keyU,
            listaChat: [],
            inpBut: true,
            keyR: keyU
        })

        const dbRefObjec7 = window.firebase.database().ref();
        const dbRefObjec8 = window.firebase.database().ref();
        let self2 = this

        let decrypt = new window.JSEncrypt();
    
        const dbRefList2 = dbRefObjec7.child('pessoas');
        const dbRefList3 = dbRefObjec8.child('message');

        await dbRefList2.on('child_added', snap3 => {

            decrypt.setPrivateKey(self2.state.keyPri);
            
            if(snap3.val().name === self2.state.name){

                self2.setState({
                    keyS: snap3.key
                })

                dbRefList3.on('child_added', snap4 => {

                    if((snap4.val().keyS === snap3.key)&&(snap4.val().keyR === keyU)){

                        let uncrypted = decrypt.decrypt(snap4.val().messagemS);
                        let tipo = 'left'
                        self2.inserirL(tipo, uncrypted)
                    }
                    if((snap4.val().keyR === snap3.key)&&(snap4.val().keyS === keyU)){

                        let uncrypted = decrypt.decrypt(snap4.val().messagemR);
                        let tipo = 'right'
                        self2.inserirL(tipo, uncrypted)
                    }
                });
            }else{
            }
        });
    }

    render() {
        return (
        <div>
            <PrincipalConteiner {...this.state} handleClick={this.handleClick} handleClickU={this.handleClickU} AlterarM={this.AlterarM} handleClickC={this.handleClickC}/>
        </div>
        );
    }
}

export default Principal;