import React from "react";

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: "",
            signInPassword: ""
        }
    }

    onEmailChange = (evt) => {
        this.setState({signInEmail: evt.target.value});
    }

    onPasswordChange = (evt) => {
        this.setState({signInPassword: evt.target.value});
    }

    onSubmitButton = () => {
        fetch("https://brain-server2138.herokuapp.com/signin", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(res => res.json())
        .then(user => {
            if (user.id) {
                this.props.loadUser(user);
                this.props.onRouteChange("home");
            }
        });
    }

    render() {
        const { onRouteChange } = this.props;
        return(
            <article className="br3 shadow-5 w-25-l center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw7 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                                className="pa2 input-reset ba br2 bg-transparent hover-bg-navy hover-white w-100" 
                                onChange={this.onEmailChange}
                                type="email" 
                                name="email-address" 
                                id="email-address"/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                                className="b pa2 input-reset ba br2 bg-transparent hover-bg-navy hover-white w-100" 
                                onChange={this.onPasswordChange}
                                type="password" 
                                name="password"  
                                id="password"/>
                        </div>
                        </fieldset>
                        <div className="">
                        <input 
                            onClick={this.onSubmitButton}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Sign in"/>
                        </div>
                        <div className="lh-copy mt3">
                        <p onClick={() => onRouteChange("register")} className="f6 fw5 link dim black db pointer">Registry</p>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
    
}

export default SignIn;