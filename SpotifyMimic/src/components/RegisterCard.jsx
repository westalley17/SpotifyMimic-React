// basic imports needed to render all the needed code below.
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
// this CSS file is custom made to mimic Spotify, basically the most important part in terms of appearances. 
import '../css/App.css'
import React, { useState } from "react"

// register definition start
export default function RegisterCard(props) {
    return (                                                  // this ternary operator conditionally hides/shows the card depending on the prop "regVisible" passed in
        <div id="divRegister" className="card col-lg-4 bg-card" style={props.regVisible ? { display: 'block' } : { display: 'none' }}>
            <div className="card-body">
                <h1 className="text-white"><strong>Sign up for Spotify</strong></h1>
                <hr />
                <form>
                    <div className="form-group">
                        <label htmlFor="txtFirstName" className="form-label"> First Name </label>
                        <input placeholder="John" id="txtFirstName" className="input" />
                        <label htmlFor="txtLastName" className="form-label"> Last Name </label>
                        <input placeholder="Smith" id="txtLastName" className="input" />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="txtEmail" className="form-label"> Email </label>
                        <input placeholder="johndoe@gmail.com" id="txtEmail" className="input" type="email" />
                        <label htmlFor="txtPassword" className="form-label"> Password </label>
                        <input placeholder="notJohn1234" id="txtPassword" className="input" type="password" />
                    </div>
                    <button className="col-12 btn btn-submit text-black mt-3" type="button"><strong>Register</strong></button>
                    <hr />
                    <button className="col-12 btn mt-1 btn-toggle" type="button" onClick={() => { props.regToggle(); props.loginToggle(); }}>Return to Login</button>
                </form>
            </div>
        </div>
    )
}
// register definition end