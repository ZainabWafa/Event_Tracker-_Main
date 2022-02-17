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
// import { auth } from './firebase';
// import Signin from './pages/Signin';
// import { useEffect, useState } from 'react';

function App() {
//   const [user, setUser] = useState(null)
//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(userAuth => {
//       const user = {
//         uid: userAuth?.uid,
//         email: userAuth?.email
//       }
//       if (userAuth) {
//         console.log(userAuth)
//         setUser(user)
//       } else {
//         setUser(null)
//       }
//     })
//     return unsubscribe
// }, [])
return (
  <BrowserRouter>
    <div className="App">
      {/* {user ? <Home /> : <Signin />} */}
      <Header />
      <ToastContainer position="top-center" />
      <Switch>
        {/* {user ? <Home /> : <Signin />}  */}
        {/* <Route  exact path="/" component={user ? <Home /> : <Signin />} />  */}
        <Route path="/" component={Home} />
        <Route path="/add" component={AddEdit} />
        <Route path="/update/:id" component={AddEdit} />
        <Route path="/view/:id" component={View} />
        <Route path="/about" component={About} />
        <Route path="/search" component={Search} />
      </Switch>
      <></>
    </div>
  </BrowserRouter>
);
}

export default App;
