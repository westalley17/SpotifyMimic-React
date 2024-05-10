// basic imports needed to render all the needed code below.
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import '../css/App.css'
import React, { useState } from "react"
import axios from 'axios'
import SweetAlert2 from 'react-sweetalert2'

// login definition start
export default function LoginCard(props) {
    const [swalProps, setSwalProps] = useState({})
    // these useState pieces act as local variables that can potentially be passed to child/sibling components (format is [getter, setter])
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    /* This block of code below allows for automatic sign-on with the use of session storage.
        If the user has a session id in their storage, we will log them in automatically. */
    const SessionID = sessionStorage.getItem('SessionID')
    // verify that there's a sessionID stored.
    const [load, setLoad] = useState(false) // this will make sure this request is only handled ONCE (on our first load of the page)

    if (SessionID && !load) {
        setLoad(true)
        // use Axios here to retrieve the user details in the event that the session is still active.
        axios.get(`http://localhost:3000/api/sessions?SessionID=${SessionID}`).then((session) => {
            console.log(session)
            // if response returns an active session, then load that user's dashboard
            if (session.status == '200') {
                props.loginToggle()
                props.dashboardToggle()
            }
            // else the user's session has expired and they need to continue with the normal log in process.
            else {
                setSwalProps({
                    show: true,
                    icon: 'error',
                    title: 'Error',
                    text: session.response.data.error,
                    onConfirm: () => {
                        // Reset swalProps
                        setSwalProps({})
                    }
                })
            }
        })

    }

    // this login function is what verifies our user's credentials before being passed to the backend for authentication. Will use RegEx matching in the future.
    const login = (e) => {
        e.preventDefault()
        try {
            let strHTML = ''
            if (email.length < 1) { // don't let email be blank
                strHTML += '<p>Invalid email</p>'
            }
            if (password.length < 1) { // or the password
                strHTML += '<p>Invalid password</p>'
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
                    // use Axios here to call a POST to the sessions endpoint, creating a new session as long as the account is legitimate.
                    axios.post('http://localhost:3000/api/sessions', { email, password }).then((response) => {
                        setSwalProps({
                            show: true,
                            icon: 'success',
                            title: 'Successfully logged in!',
                            onConfirm: () => {
                                // Reset swalProps
                                setSwalProps({})
                            }
                        })
                        // zeroes out the fields so that it looks nicer when we go to sign in again.
                        setEmail('')
                        setPassword('')
                        // sets session storage, removing the need to sign in again for the next 24 hours (once I actually code that part in)
                        sessionStorage.setItem('SessionID', response.data.SessionID)
                        
                        // Alright, so these toggles don't work... for some reason. It's only when logging in with this axios.post callback format. 
                        // Note: The axios.get callback on line 25 does the same thing with some other stuff and those toggles work perfectly. 
                        props.loginToggle()
                        props.dashboardToggle()
                    })
                }
                catch (error) {
                    // basic error catch-all, will handle certain responses differently later on
                    console.log(error.response.data.error)
                    setSwalProps({
                        show: true,
                        icon: 'error',
                        title: 'Account is invalid!',
                        text: error.response.data.error,
                        onConfirm: () => {
                            // Reset swalProps
                            setSwalProps({})
                        }
                    })
                }
            }
        } catch (error) {
            // basic error catch-all, will handle certain responses differently later on
            console.log(error)
        }
    }

    return (                                            // this ternary operator conditionally hides/shows the card depending on the prop "loginVisible" passed in
        <div id="divLogin" className="card col-lg-4 bg-card" style={props.loginVisible ? { display: 'block' } : { display: 'none' }}>
            <div className="card-body">
                <h1 className="text-white"><strong>Log in to Spotify</strong></h1>
                <hr />
                <form>
                    <div className="form-group mt-2">
                        <label htmlFor="txtLoginEmail" className="form-label text-white"> Email or username </label>
                        <input id="txtLoginEmail" placeholder="Email or username" type="email" className="input mb-2" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        <label htmlFor="txtLoginPassword" className="form-label text-white"> Password </label>
                        <input id="txtLoginPassword" placeholder="Password" type="password" className="input mb-3" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                    <button className="btn col-12 btn-submit text-black" type="button" onClick={login}><strong>Log in</strong></button>
                    <hr />
                    <button className="btn col-12 btn-toggle" type="button" onClick={() => { props.loginToggle(); props.regToggle(); }}>Sign up for Spotify</button>
                </form>
            </div>
            {/* This SweetAlert component makes our page look more professional than using the built-in alert component with HTML. */}
            <SweetAlert2 {...swalProps} />
        </div>
    )
}
// login definition end