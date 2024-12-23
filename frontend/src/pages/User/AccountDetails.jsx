import React, { useContext, useEffect, useState } from "react";
import api from "../../utils/api";
import { toast, ToastContainer } from "react-toastify";
import { UserContext } from "../../utils/UserContext.jsx";

function AccountDetails() {

  const user = useContext(UserContext)

  const [firstname, setFirstName] = useState("")
  const [lastname, setLastName] = useState("")
  const [username, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  // const [newPassword, setNewPassword] = useState("")
  // const [confirmPassword, setConfirmPassword] = useState("")

  useEffect(() => {
    if (user) {
      setFirstName(user.firstname || "")
      setLastName(user.lastname || "")
      setUserName(user.username || "")
      setEmail(user.email || "")
    }

  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!currentPassword) {
      toast.error("Current password is required for any changes")
    } else {
      const userdata = { firstname, lastname, username, email, currentPassword }

      try {
        const response = await api.post('/api/userupdate', userdata)
        toast.success(response.data.message)
        setCurrentPassword("")
      } catch (error) {
        toast.error(error.response.data.message)
        // console.log(error)
      }
    }

  }


  return (
    <>
      <form className="account-details-area" onSubmit={handleSubmit}>
        <h2 className="title">Account Details</h2>
        <div className="input-half-area">
          <div className="single-input">
            <input type="text" placeholder="First Name" value={firstname} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div className="single-input">
            <input type="text" placeholder="Last Name" value={lastname} onChange={(e) => setLastName(e.target.value)} />
          </div>
        </div>
        <input type="text" placeholder="Display Name" value={username} autoComplete="username" onChange={(e) => setUserName(e.target.value)} readOnly />
        <input type="email" placeholder="Email Address *" value={email} autoComplete="email" onChange={(e) => setEmail(e.target.value)} readOnly />
        {/* <input type="email" placeholder="Email Address *" /> */}
        <input type="password" placeholder="Current Password *" autoComplete="current-password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
        {/* <input type="password" placeholder="New Password *" autoComplete="new-password" onChange={(e) => setNewPassword(e.target.value)}/>
        <input type="password" placeholder="Confirm Password *" autoComplete="new-password" onChange={(e) => setConfirmPassword(e.target.value)}/> */}
        <button className="rts-btn btn-primary">Save Change</button>
      </form>
      <ToastContainer autoClose={3000} closeButton={false} />
    </>
  );
}

export default AccountDetails;
