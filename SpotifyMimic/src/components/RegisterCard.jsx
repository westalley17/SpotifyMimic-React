// basic imports needed to render all the needed code below.
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
// this CSS file is custom made to mimic Spotify, basically the most important part in terms of appearances. 
import '../css/App.css'
import React, { useState } from "react"
import SweetAlert2 from "react-sweetalert2"
import axios from 'axios'

// register definition start
export default function RegisterCard(props) {
    const [swalProps, setSwalProps] = useState({})
    // these useState pieces act as local variables that can potentially be passed to child/sibling components (format is [getter, setter])
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const registerAccount = async (e) => {
        e.preventDefault()
        try {
            let strHTML = ''
            if (email.length < 1) { // don't let email be blank
                strHTML += '<p>Invalid email</p>'
            }
            if (password.length < 1) { // or the password
                strHTML += '<p>Invalid password</p>'
            }
            if (firstName.length < 1) { // or the first name
                strHTML += '<p>Invalid first name</p>'
            }
            if (lastName.length < 1) { // or the last name
                strHTML += '<p>Invalid last name</p>'
            }
            if (strHTML) { // if either or both of them are blank
                setSwalProps({
                    show: true,
                    icon: 'error',
                    title: 'Something went wrong!',
                    html: strHTML,
                    onConfirm: () => {
                        // Reset swalProps
                        setSwalProps({})
                    }
                })
            }
            else {
                try {
                    // use Axios here to call a POST to the users endpoint, creating a new user as long as the email has not been used previously.
                    const response = await axios.post('http://localhost:3000/api/users', { email, password, firstName, lastName })
                    setSwalProps({
                        show: true,
                        icon: 'success',
                        title: 'Successfully created account!',
                        onConfirm: () => {
                            // Reset swalProps
                            setSwalProps({})
                        }
                    })
                    // zeroes out the fields so that it looks nicer when we go to sign in again.
                    setEmail('')
                    setPassword('')
                    setFirstName('')
                    setLastName('')
                    /////////////
                    props.regToggle() // this hides the register card, WILL MAKE THE TRANSITION SMOOTHER IN THE FUTURE
                    props.loginToggle() // this shows the login card so that the user can then sign in with that account and continue through the application.
                } catch (error) {
                    // basic error catch-all, will handle certain responses differently later on
                    console.log(error)
                    setSwalProps({
                        show: true,
                        icon: 'error',
                        title: 'Something went wrong!',
                        text: error.response.data.error,
                        onConfirm: () => {
                            // Reset swalProps
                            setSwalProps({})
                        }
                    })
                    // zeroes out the fields so that they can keep their name but have to retype the email and password.
                    setEmail('')
                    setPassword('')
                }
            }
        } catch (error) {
            // basic error catch-all, will handle certain responses differently later on
            console.log(error)
        }
    }
    return (                                                  // this ternary operator conditionally hides/shows the card depending on the prop "regVisible" passed in
        <div id="divRegister" className="card col-lg-4 bg-card" style={props.regVisible ? { display: 'block' } : { display: 'none' }}>
            <div className="card-body">
                <h1 className="text-white"><strong>Sign up for Spotify</strong></h1>
                <hr />
                <form>
                    <div className="form-group">
                        <label htmlFor="txtFirstName" className="form-label"> First Name </label>
                        <input id="txtFirstName" placeholder="John" className="input" value={firstName} onChange={(e) => { setFirstName(e.target.value) }} />
                        <label htmlFor="txtLastName" className="form-label"> Last Name </label>
                        <input id="txtLastName" placeholder="Smith" className="input" value={lastName} onChange={(e) => { setLastName(e.target.value) }} />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="txtEmail" className="form-label"> Email </label>
                        <input id="txtEmail" placeholder="johndoe@gmail.com" className="input" type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        <label htmlFor="txtPassword" className="form-label"> Password </label>
                        <input id="txtPassword" placeholder="notJohn1234" className="input" type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                    <button className="col-12 btn btn-submit text-black mt-3" type="button" onClick={registerAccount}><strong>Register</strong></button>
                    <hr />
                    <button className="col-12 btn mt-1 btn-toggle" type="button" onClick={() => { props.regToggle(); props.loginToggle(); }}>Return to Login</button>
                </form>
                {/* This SweetAlert component makes our page look more professional than using the built-in alert component with HTML. */}
                <SweetAlert2 {...swalProps} />
            </div>
        </div>
    )
}
// register definition end