import React, { Component } from 'react';
//import { Redirect } from 'react-router-dom';
import AppConteiner from './compont/app-conteiner';

class App extends Component {
  constructor (){
    super()
    this.state = {
      email: '',
      senha: ''
    }
    this.handleChangeE = this.handleChangeE.bind(this);
    this.handleChangeS = this.handleChangeS.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount () {
    const { history } = this.props
    window.firebase.auth().onAuthStateChanged(firebaseUser =>{
      if(firebaseUser){
        history.push('/principal')
      }else{
      
      }
    });
  }

  handleChangeE(event) {
    this.setState({email: event.target.value});
  }

  handleChangeS(event) {
    this.setState({senha: event.target.value});
  }

  handleSubmit(event) {
    const email = this.state.email
    const senha = this.state.senha
    const { history } = this.props
    const auth = window.firebase.auth();
    
    //o metodo signInWithEmailAndPassword serve para fazer o login no firebase.
    auth.signInWithEmailAndPassword(email, senha).then(function(){

        localStorage.setObject("usu", []);

        console.log(email)

        let user = {
            email: email
        };

        let array = localStorage.getObject("usu");
        array.push(user);
        localStorage.setObject("usu", array); 
        
        console.log(user)
        history.push('/principal')
        //window.location.replace("telaprincipal.html");

    }, function(error) {
        // Handle Errors here.
        if (email === '' || senha === '') {
            alert("Preencha os dados vazios!")
        }else{
            alert("Dados incorretos!")
        }
        // ...
    });

    event.preventDefault();
  }

  render() {
    return (
        <AppConteiner {...this.state}
        handleChangeE={this.handleChangeE}  handleChangeS={this.handleChangeS} handleSubmit={this.handleSubmit}/>
    );
  }
}

export default App;