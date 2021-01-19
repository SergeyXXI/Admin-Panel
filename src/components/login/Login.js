import React, {useState} from "react";
import UIkit from "uikit";

const Login = ({authorization}) =>
{
    const [valid, setValid] = useState(null);
    const [disabled, setDisabled] = useState(true);
    var notification = null;    

    if(valid === false) notification = <span>Пароль должен быть не менее 6 символов!</span>;    

    const changeInputValueHandler = e =>
    {
        if(e.target.value.length > 5)
        {
            if(!valid)
            {
                setDisabled(null); 
                setValid(true);  
            }
           
        } 
        else
        {
            if(valid || valid === null)
            {
                setDisabled(true);  
                setValid(false); 
            }
            
        }
        
    };   

    const clickHandler = () =>
    {        
        const password = document.querySelector("input").value;
        authorization(password)
        .then(data => 
             {
                data === "Incorrect password" ?
                UIkit.notification("Введён неверный пароль!", {status: "danger", timeout: 2000}) :
                null; 
             });
    };

    return(
        <div className="login-container">
            <div className="login-main">
                <h2>Авторизация</h2> 
                    <div className="uk-margin-small">                                  
                        <input onChange={e => changeInputValueHandler(e)} className="uk-input uk-margin-small-bottom" type="password" placeholder="Пароль" />
                        {notification}
                    </div>
                <button onClick={clickHandler} className="uk-button uk-button-primary" disabled={disabled}>Войти</button>

            </div>
        </div>
    );
};

export default Login;