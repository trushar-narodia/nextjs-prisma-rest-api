import React from 'react'

export default function Navbar() {
  return (
    <div className="row mb-3">
      <div className="col-12 border-primary border-bottom border-3">
        <ul className="nav justify-content-center ">
          <li className="nav-item">
            <a className="nav-link text-black" aria-current="page" href="/users">Users</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-black" href="/login">Login</a>
          </li>
        </ul>
      </div>
    </div>
  )
}