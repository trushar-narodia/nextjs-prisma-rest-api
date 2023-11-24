'use client'
import React, { useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'
import prisma from "../../lib/prisma"
export default function Users() {

  // state for users
  const [users, setUsers] = React.useState([]);

  // create ref for close button
  const closeButtonRef: any = useRef();

  useEffect(() => {
    fetchAllUsers();
  }, [])

  const fetchAllUsers = async () => {
    try {
      const response = await fetch(`/api/users`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).then(res => res.json())
      if (response.status === 200) {
        setUsers(response.data)
      }
    } catch (error) {
      console.log(error);
    }

  }

  const deleteUser = async (id: any) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }).then(res => res.json())
      if (response.status === 200) {
        alert('User deleted successfully')
        fetchAllUsers();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddUser = async (e: any) => {
    e.preventDefault()
    try {
      const formData = new FormData(e.target)
      const data = Object.fromEntries(formData)
      const response = await fetch(`/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(res => res.json())
      if (response.status === 200) {
        alert('User added successfully')
        closeButtonRef.current.click()
        fetchAllUsers();
      }
    } catch (error) {
      console.log(error);

    }
  }

  return (
    <>
      <Navbar />
      <div className="row mt-2">
        <div className="col-12 d-flex justify-content-start">
          <h3>List of users</h3>
          <div className='ms-2 d-flex flex-column justify-content-center'>
            <button className='btn btn-sm btn-secondary' data-bs-toggle="modal" data-bs-target="#addUserModal">+Add</button>
          </div>
        </div>
        <div className="col-12">
          <table className='table table-hover table-sm'>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map((user: any, index: any) => (
                  <tr key={index}>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.email}</td>
                    <td>{user.mobile}</td>
                    <td><button className='btn btn-sm btn-primary' type='button' onClick={() => deleteUser(user.id)}>Delete</button></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
      <div className="modal fade" id="addUserModal" tabIndex={-1} aria-labelledby="addUserModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addUserModal">Add User</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form className='' onSubmit={handleAddUser}>
              <div className="modal-body">
                <div className="row">
                  <div className="mb-1 col-6">
                    <label htmlFor="exampleFormControlInput1" >First Name</label>
                    <input type="text" name='first_name' className="form-control" placeholder="First name" />
                  </div>
                  <div className="mb-1 col-6">
                    <label htmlFor="exampleFormControlInput1" >Last Name</label>
                    <input type="text" name='last_name' className="form-control" placeholder="Last name" />
                  </div>
                  <div className="mb-1 col-6">
                    <label htmlFor="exampleFormControlInput1" >Email</label>
                    <input type="email" name='email' className="form-control" placeholder="Email" />
                  </div>
                  <div className="mb-1 col-6">
                    <label htmlFor="exampleFormControlInput1" >Mobile</label>
                    <input type="number" name='mobile' className="form-control" placeholder="Mobile" />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeButtonRef}>Close</button>
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}