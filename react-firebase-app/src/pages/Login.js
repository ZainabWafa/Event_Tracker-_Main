import React from "react";
import "./Login.css";

const Login = (props) => {
    const { email,
    setEmail,
    password, 
    setPassword, 
    handleLogin,
    handleSignup,
    hasAccount,
    setHasAccount,
    emailError,
    passwordError,
     } = props;
    return (
        <section className="login">
            <div className="loginContainer">
                <label>username</label>
                <input type="text"
                autoFocus
                requiredvalu={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <p className="errorMsg">{emailError}</p>
                    <label>password</label>
                
                <input type="password"
                autoFocus
                requiredvalu={password}
                onChange={(e) => setPassword(e.target.value)}
                /> 
                <p className="errorMsg">{passwordError}</p>   

                <div className="btnContainer">
                    {hasAccount ?(
                        <>
                        <button onClick={handleLogin}>Sign in</button>
                        <p>dont have an Account? <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span></p>
                        </>
                    ):(
                        <>
                        <button onClick={handleSignup}>Sing Up</button>
                        <p>Have an account?
                            <span onClick={() => setHasAccount(!hasAccount)}>Sign in</span></p>
                        </>
                    )}
                </div>

                
            </div>
        </section>
    );
};

export default Login;










// const Login = () => {
//     const [user, setUser] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [emailError, setEmailError] = useState('');
//     const [passwordError, setPaswordError] = useState('');
//     const [hasAccount, setHasAccount] = useState(false);

//     const clearInputs= () =>{
//         setEmail('');
//         setPassword('');

//     }
//     const clearErrors = () =>{
//         setEmailError('');
//         setPaswordError('');
//     }

//     const handleLogin = () => {
//         clearErrors();
//         fire
//             .auth()
//             .signInwithEmailAndPassWord(email, password)
//             .catch(err => {
//                 switch (err.code) {
//                     case "auth/invalid-email":
//                     case "auth/user-disabled:":
//                     case "auth/user-not-found":
//                         setEmailError(err.message);
//                         break;
//                     case "auth/wrong-password":
//                         setPaswordError(err.message);
//                         break;

//                 }
//             });
//     };
//     const handleSignup = () => {
//         clearErrors();
//         fire
//             .auth()
//             .signInwithEmailAndPassWord(email, password)
//             .catch(err => {
//                 switch (err.code) {
//                     case "auth/email-already-in-use":
//                     case "auth/invalid-email":
//                         setEmailError(err.message);
//                         break;
//                     case "auth/weak-password":
//                         setPaswordError(err.message);
//                         break;

//                 }
//             });
//     };
//     const handleLogout = () => {
//         fire.auth().signOut();
//     };

//     const authListener = () => {
//         fire.auth().onAuthstatechanged(user => {
//             if (user) {
//                 clearInputs();
//                 setUser(user);
//             }
//             else {
//                 setUser("");
//             }
//         });
//     };
//     useEffect(() =>{
//         authListener
//     },[]);
// return(
//     <div className="App">
//         <Login/>
//     </div>
// );
// };



