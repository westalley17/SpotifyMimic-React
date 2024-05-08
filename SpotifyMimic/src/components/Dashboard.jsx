// basic imports needed to render all the needed code below.
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import '../css/App.css'
import SweetAlert2 from 'react-sweetalert2'
import React, { useState } from 'react'
import axios from 'axios'

// dashboard definition start
export default function Dashboard(props) {
    // these useState pieces act as local variables that can potentially be passed to child/sibling components (format is [getter, setter])
    const [swalProps, setSwalProps] = useState({})

    const logOut = async (e) => {
        e.preventDefault()
        const SessionID = sessionStorage.getItem('SessionID')
        // verify that there's a sessionID stored.
        if (SessionID) {
            // use Axios here to call delete to the sessions endpoint, removing our generated session in the event that we manually logout
            // (auto logout will happen every 24 hours)
            const response = await axios.delete('http://localhost:3000/api/sessions', { data: { SessionID } })
            sessionStorage.removeItem('SessionID') // remove from client-side after removing from backend, (MAKE THIS A TRY CATCH BLOCK LATER, IM TIRED)
            setSwalProps({
                show: true,
                icon: 'success',
                title: 'Successfully logged out!',
                onConfirm: () => {
                    // Reset swalProps
                    setSwalProps({})
                }
            })
            // flips the dashboard and login to make sure we go back to the Login screen after logging out.
            props.toggle()
            props.loginToggle()
        }
    }

    return (
        <div id="divMimic" className="card col-lg-6 bg-card" style={props.isVisible ? { display: 'block' } : { display: 'none' }}>
            <div id="divMimicHeader" className="row col-12">
                <div className="col-8">
                    <h1 className="text-white mt-2"><strong>Spotify Mimic</strong></h1>
                </div>
                <div className="col-4">
                    <button className="float-end btn btn-logout mt-2 text-black" onClick={logOut}><strong>Log out</strong></button>
                </div>
                {/* This SweetAlert component makes our page look more professional than using the built-in alert component with HTML. */}
                <SweetAlert2 {...swalProps} />
            </div>
            <hr />
            <div id="divMimicBody" className="card-body">
                <h4 className="text-white">Your Library</h4>
                <div className="card bg-card col-12">
                    <div className="card-body" id="divCardLibrary">
                        {/* This will be populated with all the ACTUAL relevant data pertaining to the user and their choice of songs for their libraries.*/}
                    </div>
                </div>
            </div>
        </div>
    )
}
// dashboard definition start