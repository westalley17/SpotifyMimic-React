/*
  This is the main component of the Spotify Mimic. 
  Here is where we render the Login and Register cards along with the Dashboard once we have logged in.
*/
// basic imports needed to render all the needed components below.
import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import './css/App.css'
import LoginCard from './components/LoginCard.jsx'
import RegisterCard from './components/RegisterCard.jsx'
import Dashboard from './components/Dashboard.jsx'

// app definition start
export default function App() {
  // these useState pieces act as local variables that can be passed to child/sibling components (format is [getter, setter])
  const [loginVisible, toggleLoginVisible] = useState(true)
  const [registerVisible, toggleRegisterVisible] = useState(false)
  const [showDashboard, toggleShowDashboard] = useState(false)

  // these 3 functions below are needed to abstract the function calls for when we pass them as props to the child components.
  const swapLoginVisible = () => { toggleLoginVisible(!loginVisible) }

  const swapRegVisible = () => { toggleRegisterVisible(!registerVisible) }

  const toggleDashboard = () => { toggleShowDashboard(!showDashboard) }

  // this is where the XML is actually written that will later be converted to JS and HTML when its rendered through Vite (I think that's mostly right)
  return (
    <div className="d-flex vh-100 col-12 justify-content-center align-items-center bg-main">
      {/* These are the main components of the application, especially the Dashboard. 
        The attributes attached to the components are "props" and are similar to passing parameters in normal code. */}
      <LoginCard loginVisible={loginVisible} loginToggle={swapLoginVisible} regToggle={swapRegVisible} dashboardToggle={toggleDashboard} />
      <RegisterCard regVisible={registerVisible} regToggle={swapRegVisible} loginToggle={swapLoginVisible} />
      <Dashboard isVisible={showDashboard} toggle={toggleDashboard} loginToggle={swapLoginVisible} />
    </div>
  )
}
// app definition end