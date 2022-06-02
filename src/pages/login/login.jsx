import React from "react";
import Header from "../../components/header/header";
import PageLogin from "../../components/page-login/page-login";
import { observer } from "mobx-react-lite";


const Login = observer (() => {

    return (
        <>
        <Header />
        <section className="main__wrapper">
            <PageLogin/>
        </section>
        </>      
    )
})

export default Login;



