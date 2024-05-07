import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import '../css/App.css'
import React, { useState } from "react"

export default function RegisterCard(props) {

    return (
        <div id="divRegister" className="card col-lg-4 bg-card" style={props.isVisible ? { display: 'block' } : { display: 'none' }}>
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
                    <button className="col-12 btn mt-1 btn-toggle" type="button" onClick={props.toggle}>Return to Login</button>
                </form>
            </div>
        </div>
    )
}