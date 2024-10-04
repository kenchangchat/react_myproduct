import React, { useState, useEffect } from "react";

function Logout() {
    useEffect(()=>{
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("user_id");
        sessionStorage.removeItem("user_type");
        const timeout = setTimeout(() => {
            window.location.replace('/');
        }, 500);
        return () => clearTimeout(timeout);
    },[]);
}
export default Logout;