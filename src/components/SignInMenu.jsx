import React from 'react'
import './SignInMenu.css'

function SignInMenu() {
  return (
    <div>
      <div className="header">
        SignOut
      </div>
      <div className="user-details">
        <div className="avatar">
            <img src="" alt="" />
        </div>
        <div>
            <div>email@</div>
            <div>Display Name</div>
            <a href="">View Profile</a>
        </div>
      </div>
      <div className="footer">
        SignIn with a different account
      </div>
    </div>
  )
}

export default SignInMenu
