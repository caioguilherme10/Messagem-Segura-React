import React, { Component } from 'react';
import CadastroConteiner from './compont/cadastro-conteiner';

class Cadastro extends Component {
  constructor (){
    super()
    this.state = {
      nome: '',
      email: '',
      senha: ''
    }
    this.handleChangeE = this.handleChangeE.bind(this);
    this.handleChangeS = this.handleChangeS.bind(this);
    this.handleChangeN = this.handleChangeN.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount () {
    localStorage.setObject("usu", []);
    const { history } = this.props
    const self = this
    window.firebase.auth().onAuthStateChanged(firebaseUser =>{
      if(firebaseUser){
        const nome = self.state.nome
        const email = self.state.email
        const senha = self.state.senha
        const novocrypt = self.generateKeys();

        let user = {
            email: email,
            name : nome
        };

        let array = localStorage.getObject("usu");
        array.push(user);
        localStorage.setObject("usu", array);

        window.firebase.database().ref('users/' + firebaseUser.uid).set({
            name : nome,
            email : email,
            pass : senha,
            keyPri : novocrypt.getPrivateKey()
        });

        window.firebase.database().ref('pessoas').push({
            name : nome,
            keyPub : novocrypt.getPublicKey(),
            email : email
        }).key;

        window.swal("Feito com sucesso")
        history.push('/principal')
      }else{
      
      }
    });
  }

  generateKeys(){
    let crypt = new window.JSEncrypt({default_key_size: 2048});
    return crypt;
  }

  handleChangeE(event) {
    this.setState({email: event.target.value});
  }

  handleChangeN(event) {
    this.setState({nome: event.target.value});
  }

  handleChangeS(event) {
    this.setState({senha: event.target.value});
  }

  handleSubmit(event) {
    const nome = this.state.nome
    const email = this.state.email
    const senha = this.state.senha
    
    if(email === "" || senha === "" || nome === ""){
      window.swal("Preencha os campos vazios!")
    }else{
      window.firebase.auth().createUserWithEmailAndPassword(email, senha).catch(function(error) {
          window.swal("Erro ao Cadastrar!")
      });
    }

    event.preventDefault();
  }

  render() {
    return (
      <div>
        <CadastroConteiner {...this.state}
        handleChangeE={this.handleChangeE}  handleChangeS={this.handleChangeS} handleSubmit={this.handleSubmit} handleChangeN={this.handleChangeN}/>
      </div>
    );
  }
}

export default Cadastro;