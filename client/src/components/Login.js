
import { useState } from "react";
function Login({setUser}) {
    const [userName, setUserName] = useState("");
    const [myPassword, setPassword] = useState("");
    const [my_confirm, setConfirm] = useState("");
    const [option, setOption] = useState("login")
    const [display, setOptionDisplay] = useState(false)
    
    function handleLogout() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
              setUser(null);
            }
          });
    }

    function handleUserName(event) {
        setUserName(event.target.value);
    }

    function handlePassword(event) {
        setPassword(event.target.value);
    }

    function handleConfirm(event) {
        setConfirm(event.target.value);
    }

    function handleOption(event) {
        setOption(event.target.value);
        if(event.target.value === "sign up"){
            setOptionDisplay(true)
        }
        else{
            setOptionDisplay(false)
        }
    }

      function handleSubmit(e) {
        e.preventDefault();
        if (option === "sign up") {
            const formData = {
            password: myPassword,
            username: userName,
            codeBreakScore: 50
        };
        fetch("/signup", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
      })
      setUser(userName)}
      else if (option === "sign up" && myPassword !== my_confirm) {
        alert("Passwords Don't Match")
      }
      else{
        const formData = {
            password: myPassword,
            username: userName}
            fetch("/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
              }).then((r) => {
                if (r.ok) {
                  r.json().then(setUser(userName));
                } else {
                    alert("Incorrect Login Info")
                }
              });
            }    }

      return(
        <div>
            <button className="outbutton" onClick={handleLogout}>logout</button> 
            <form className="loginForm" onSubmit={handleSubmit}>
            <h1>Log In or Sign Up</h1>
                <select
                    className="loginput" 
                    onChange={handleOption}
                    value = {option}>
                    <option value= "login">Log In</option>
                    <option value = "sign up">Sign Up</option>
                </select>  
                <input type="text"  className="loginput" placeholder = "UserName" onChange={handleUserName} value={userName} />
                <input type="text"  className="loginput" placeholder = "Password" onChange={handlePassword} value={myPassword} />
                {display ? <input type="text"  className="loginput" placeholder = "Confirm Password" onChange={handleConfirm} value={my_confirm} /> : null}
                <button type="submit">Submit</button>
            </form>
        </div>
      )
}

export default Login;