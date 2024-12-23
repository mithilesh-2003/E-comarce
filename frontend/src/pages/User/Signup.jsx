import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { toast, ToastContainer } from "react-toastify";

function Signup() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!username || !email || !password) {
      toast.error("All fields are required")
    } else {
      const toastId = toast.loading("Loading..."); 
      try {
        const userdata = { username, email, password }
        const response = await api.post('/api/signup', userdata);
        // console.log(response)
        toast.update(toastId, { 
          render: response.data.message, 
          type: "success", 
          isLoading: false, 
          autoClose: 3000 
        });
        setUsername("")
        setEmail("")
        setPassword("")
        setTimeout(()=>{
          navigate('/login')
        },1500)
      } catch (error) {
        console.log(error)
        toast.update(toastId, { 
          render: error.response.data.message, 
          type: "error", 
          isLoading: false, 
          autoClose: 3000 
        });
      }
    }
  }

  return (
    <>
      <div>
        <div className="rts-navigation-area-breadcrumb bg_light-1">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="navigator-breadcrumb-wrapper">
                  <Link to={'/'} >Home</Link>
                  <i className="fa-regular fa-chevron-right" />
                  <Link className="current" to={'/signup'}>
                    Signup
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section-seperator bg_light-1">
          <div className="container">
            <hr className="section-seperator" />
          </div>
        </div>
        {/* rts register area start */}
        <div className="rts-register-area rts-section-gap bg_light-1">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="registration-wrapper-1">
                  <div className="logo-area mb--0">
                    <img
                      className="mb--10"
                      src="/images/logo/fav.png"
                      alt="logo"
                    />
                  </div>
                  <h3 className="title">Register Into Your Account</h3>
                  <form className="registration-form" onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                      <label htmlFor="name">Username*</label>
                      <input type="text" id="name" onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="input-wrapper">
                      <label htmlFor="email">Email*</label>
                      <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="input-wrapper">
                      <label htmlFor="password">Password*</label>
                      <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className="rts-btn btn-primary">
                      Register Account
                    </button>
                    <div className="another-way-to-registration">
                      <div className="registradion-top-text">
                        <span>Or Register With</span>
                      </div>
                      <div className="login-with-brand">
                        <a href="#" className="single">
                          <img
                            src="/images/form/google.svg"
                            alt="login"
                          />
                        </a>
                        <a href="#" className="single">
                          <img
                            src="/images/form/facebook.svg"
                            alt="login"
                          />
                        </a>
                      </div>
                      <p>
                        Already Have Account? <Link to={'/login'}>Login</Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* rts register area end */}
      </div>
      <ToastContainer autoClose={3000} closeButton={false} />
    </>
  );
}

export default Signup;
