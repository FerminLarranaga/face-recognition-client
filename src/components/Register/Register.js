import React, { useState } from "react";

const Register = ({ loadUser, onRouteChange }) => {
    const [userData, setUserData] = useState({ name: '', email: '', password: '' });

    const onNameChange = (evt) => {
        setUserData({ ...userData, name: evt.target.value });
    }

    const onEmailChange = (evt) => {
        setUserData({ ...userData, email: evt.target.value });
    }

    const onPasswordChange = (evt) => {
        setUserData({ ...userData, password: evt.target.value });
    }

    const onSubmitButton = () => {
        fetch("https://brain-server2138.herokuapp.com/register", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: userData.name,
                email: userData.email,
                password: userData.password
            })
        })
            .then(res => res.json())
            .then(user => {
                if (user.id) {
                    loadUser(user);
                    onRouteChange("home");
                }
            })
    }

    return (
        <article className="br3 shadow-5 w-25-l center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw7 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input
                                className="pa2 input-reset ba br2 bg-transparent hover-bg-navy hover-white w-100"
                                onChange={onNameChange}
                                type="text"
                                name="name"
                                id="name"
                            />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input
                                className="pa2 input-reset ba br2 bg-transparent hover-bg-navy hover-white w-100"
                                onChange={onEmailChange}
                                type="email"
                                name="email-address"
                                id="email-address"
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input
                                className="b pa2 input-reset ba br2 bg-transparent hover-bg-navy hover-white w-100"
                                onChange={onPasswordChange}
                                type="password"
                                name="password"
                                id="password"
                            />
                        </div>
                    </fieldset>
                    <div className="">
                        <input
                            onClick={onSubmitButton}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                            type="submit"
                            value="Register" />
                    </div>
                </div>
            </main>
        </article>
    );
}

export default Register;