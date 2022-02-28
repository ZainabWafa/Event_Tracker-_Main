import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import About from "./pages/About";
import AddEdit from "./pages/AddEdit";
import Home from "./pages/Home";
import View from "./pages/View";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Search from "./pages/Search";
import { useEffect, useState } from "react";
import fire from "./firebase";
import Login from "./pages/Login"
import Hero from "./components/Hero";


function App() {
  //  const Login = () => {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPaswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);

  const clearInputs = () => {
    setEmail('');
    setPassword('');

  }
  const clearErrors = () => {
    setEmailError('');
    setPaswordError('');
  }

  const handleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInwithEmailAndPassWord(email, password)
      .catch(err => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled:":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPaswordError(err.message);
            break;

        }
      });
  };
  const handleSignup = () => {
    clearErrors();
    fire
      .auth()
      .signInwithEmailAndPassWord(email, password)
      .catch(err => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPaswordError(err.message);
            break;

        }
      });
  };
  const handleLogout = () => {
    fire.auth().signOut();
  };

  const authListener = () => {
    fire.auth().onAuthStatechanged(user => {
      if (user) {
        clearInputs();
        setUser(user);
      }
      else {
        setUser("");
      }
    });
  };
  useEffect(() => {
    authListener();
  }, []);
  return (
    < div className="App">
      {user ? (<Hero handleLogout={handleLogout}/>):( 
      <Login 
        email={email} 
        setEmail={setEmail} 
        password={password} 
        setPassword={setPassword} 
        handleLogin={handleLogin}
        handleSignup={handleSignup}
        hasAccount={hasAccount}
        setHasAccount={setHasAccount}
        emailError={emailError}
        passwordError={passwordError} />)}
       
        
    <BrowserRouter>
      <Header />
      <ToastContainer position="top-center" />
      <Switch>
       
        <Route path="/" component={Home} />
        <Route path="/add" component={AddEdit} />
        <Route path="/update/:id" component={AddEdit} />
        <Route path="/view/:id" component={View} />
        <Route path="/about" component={About} />
        <Route path="/search" component={Search} />
      </Switch>
      <></>
    
   </BrowserRouter >
   </div>
 );
}

export default App;
