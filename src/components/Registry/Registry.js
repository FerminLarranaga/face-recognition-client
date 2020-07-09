import React from "react";

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: ""
        }
    }

    onNameChange = (evt) => {
        this.setState({ name: evt.target.value});
    }

    onEmailChange = (evt) => {
        this.setState({ email: evt.target.value});
    }

    onPasswordChange = (evt) => {
        this.setState({ password: evt.target.value});
    }

    onSubmitButton = () => {
        fetch("https://brain-server2138.herokuapp.com/register", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(res => res.json())
        .then(user => {
            if (user.id) {
                this.props.loadUser(user);
                this.props.onRouteChange("home");
            }
        })
    }

    render() {
        return(
            <article className="br3 shadow-5 w-25-l center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw7 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input 
                                className="pa2 input-reset ba br2 bg-transparent hover-bg-navy hover-white w-100" 
                                onChange={this.onNameChange}
                                type="text" 
                                name="name" 
                                id="name"
                            />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                                className="pa2 input-reset ba br2 bg-transparent hover-bg-navy hover-white w-100" 
                                onChange={this.onEmailChange}
                                type="email" 
                                name="email-address" 
                                id="email-address"
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                                className="b pa2 input-reset ba br2 bg-transparent hover-bg-navy hover-white w-100" 
                                onChange={this.onPasswordChange}
                                type="password" 
                                name="password" 
                                id="password"
                            />
                        </div>
                        </fieldset>
                        <div className="">
                        <input 
                            onClick={this.onSubmitButton}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Register"/>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default SignIn;