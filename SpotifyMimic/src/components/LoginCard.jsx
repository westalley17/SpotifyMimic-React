import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import '../css/App.css'
import React, { useState } from "react"

export default function LoginCard(props) {

    return (
        <div id="divLogin" className="card col-lg-4 bg-card" style={props.isVisible ? { display: 'block' } : { display: 'none' }}>
            <div className="card-body">
                <h1 className="text-white"><strong>Log in to Spotify</strong></h1>
                <hr />
                <form>
                    <div className="form-group mt-2">
                        <label htmlFor="txtLoginEmail" className="form-label text-white"> Email or username </label>
                        <input placeholder="Email or username" type="email" className="input mb-2" id="txtLoginEmail" />
                        <label htmlFor="txtLoginPassword" className="form-label text-white"> Password </label>
                        <input placeholder="Password" type="password" className="input mb-3" id="txtLoginPassword" />
                    </div>
                    <button className="btn col-12 btn-submit text-black" id="btnLogin" type="button"><strong>Log in</strong></button>
                    <hr />
                    <button className="btn col-12 btn-toggle" type="button" onClick={props.toggle}>Sign up for Spotify</button>
                </form>
            </div>
        </div>
    )
}