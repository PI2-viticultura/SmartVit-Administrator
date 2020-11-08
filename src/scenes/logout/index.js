import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { logout, getToken } from "../../services/auth"


function Logout() {
    console.log('aaaaaaaaaaaaaaaaa')
    let isRedirect;
    if(getToken()){
        console.log('pegou')
        isRedirect = true;
    }else {
        console.log('não pegou')
        isRedirect = false;
    }
    logout();
    console.log(isRedirect)
    if(isRedirect){
        window.location.reload(true);
    }
    return (
        <Redirect to={{
            pathname: "/",
            state: { isLogout: true }
        }}></Redirect>
    );
}

export default Logout;