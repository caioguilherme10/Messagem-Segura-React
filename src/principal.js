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
            value: ''
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleClickU = this.handleClickU.bind(this);
        this.AlterarM = this.AlterarM.bind(this);
        this.handleClickC = this.handleClickC.bind(this);
        
    }

    handleClickC(){

        const message = this.state.value
        const keyR = this.state.keyR
        const keyS = this.state.keyS

        window.firebase.database().ref('pessoas/' + keyR).once('value').then(function(snapshot) {
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

        this.setState({
            value: ''
        })
    }

    AlterarM(value){
        this.setState({
            value: value
        })
    }

    inserir (name , email) {
        this.setState({
            name: name,
            email: email
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

        window.firebase.auth().onAuthStateChanged(firebaseUser =>{
            if(firebaseUser){
                console.log("ta on");
            }else{
                console.log("ta off");
                localStorage.setObject("usu", []);
                window.location.replace("/");
            }
        });

        const { history } = this.props
        window.firebase.auth().onAuthStateChanged(firebaseUser =>{
          if(firebaseUser){

          }else{
            history.push('/')
          }
        });

        let array = localStorage.getObject("usu");

        const dbRefObjec = window.firebase.database().ref();

        const two = dbRefObjec.child('users').orderByChild('email').equalTo(array[0].email);

        const self = this

        two.on('child_added', snap => {

            self.inserir(snap.val().name, snap.val().email)

            let user = {
                name: snap.val().name,
                email: snap.val().email,
                keyPri : snap.val().keyPri
            };

            array = [];
            array.push(user);
            console.log(user);
            localStorage.setObject("usu", array);

        });

        const dbRefList = dbRefObjec.child('pessoas');

        dbRefList.on('child_added', snap2 => {

            let array2 = self.state.name;
        
            if(snap2.val().name === array2){

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

        const dbRefObjec = window.firebase.database().ref();
        const dbRefObjec8 = window.firebase.database().ref();
        let self2 = this

        let decrypt = new window.JSEncrypt();
    
        const dbRefList2 = dbRefObjec.child('pessoas');
        const dbRefList3 = dbRefObjec8.child('message');

        await dbRefList2.on('child_added', snap3 => {

            let array3 = localStorage.getObject("usu");

            decrypt.setPrivateKey(array3[0].keyPri);
            
            if(snap3.val().name === array3[0].name){

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