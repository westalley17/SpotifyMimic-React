import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import './css/App.css'
import LoginCard from './components/LoginCard.jsx'
import RegisterCard from './components/RegisterCard.jsx'
import Dashboard from './components/Dashboard.jsx'

export default function App() {
  const [visible, setVisible] = useState(true)

  function toggleVisible() {
    setVisible(!visible)
  }

  return (
    <>
      <div className="d-flex vh-100 col-12 justify-content-center align-items-center bg-main">
        <LoginCard isVisible={visible} toggle={toggleVisible} />
        <RegisterCard isVisible={!visible} toggle={toggleVisible} />
      </div>
    </>
  )
}