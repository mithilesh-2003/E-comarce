import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import api from '../../utils/api'
import { toast, ToastContainer } from 'react-toastify'
import { useParams } from 'react-router-dom'

function Checkout() {

    const user = JSON.parse(localStorage.getItem('user'))
    const { orderId } = useParams(); 

    // const [carts, SetCarts] = useState([])
    const [orders,setOrders] = useState([])
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [country, setCountry] = useState("")
    const [address, setAddress] = useState("")
    const [town, setTown] = useState("")
    const [state, setState] = useState("")
    const [zipcode, setZipcode] = useState("")
    const [phone, setPhone] = useState("")

    const [paymentMethod, setPaymentMethod] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [buttondisabled, setButtonDisabled] = useState(true)

    // console.log(user)


    useEffect(() => {
        if (user) {
            setFirstname(user.firstname || "")
            setLastname(user.lastname || "")
            setEmail(user.email || "")
            setCountry(user?.address?.country || "")
            setAddress(user?.address?.street_address || "")
            setTown(user?.address?.city || "")
            setState(user?.address?.state || "")
            setZipcode(user?.address?.zip_code || "")
            setPhone(user?.address?.phone || "")
        }
        const fetchCart = async () => {
            const response = await api.get(`/api/showorder/${orderId}`)
            setOrders(response.data.order.items)
            // console.log(response)
        }
       

        fetchCart()
    }, [orderId])
    console.log(orders)

    const totalPrice = () => {
        return orders.reduce((acc, order) => {
            return acc + (order.productId.sellingprice * order.quantity);
        }, 0);
    }
    

    const updateAddress = async (e) => {
        e.preventDefault()

        const data = {
            firstname, lastname, email, country, street_address: address, city: town, state, zip_code: zipcode, phone, userId: user._id
        }

        if (!firstname || !lastname || !email || !country || !address || !town || !state || !zipcode || !phone) {
            toast.error("All fileds are required")
        } else {
            try {
                const response = await api.post('/api/useraddress', data)
                setFirstname(response.data.user.firstname || "")
                setLastname(response.data.user.lastname || "")
                setEmail(response.data.user.email || "")
                setCountry(response.data.user?.address?.country || "")
                setAddress(response.data.user?.address?.street_address || "")
                setTown(response.data.user?.address?.city || "")
                setState(response.data.user?.address?.state || "")
                setZipcode(response.data.user?.address?.zip_code || "")
                setPhone(response.data.user?.address?.phone || "")
                localStorage.setItem('user', JSON.stringify(response.data.user));
                toast.success('Address updated')
                // console.log(response)
            } catch (error) {
                toast.error('Something went wrong')
                // console.log(error)
            }
        }




    }

    const handleButtonDisabled = () => {
        if (firstname && lastname && email && country && address && town && state && zipcode && phone && paymentMethod && termsAccepted) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }

    useEffect(() => {
        handleButtonDisabled();
    }, [firstname, lastname, email, country, address, town, state, zipcode, phone, paymentMethod, termsAccepted]);

    const handlePayment = async () => {

        const orderData = {
            amount: totalPrice(),
            currency: 'INR'
        }

        try {
            const response = await api.post('/api/startpayment', orderData)
            const { amount, id: order_id, currency } = response.data.order;
            console.log(response)

            console.log(amount)
            const options = {
                key: 'rzp_test_O6Bn6Gx3D2bGKN',
                amount: amount,
                currency: currency,
                name: 'Eko-cart',
                description: 'This is description',
                order_id: order_id,
                handler: function (response) {
                    alert("Payment successful");
                    console.log(response);
                    // You can make another API call here to store payment details
                },
                prefill: {
                    name: firstname + " " + lastname,
                    email: email,
                    contact: phone,
                },
                theme: {
                    color: "#3399cc"
                }
            }

            const rzp1 = new window.Razorpay(options)
            rzp1.open()


        } catch (error) {
            console.log("Error creating order:", error)
        }
    }

    return (
        <>
            <Header />
            <div className="checkout-area rts-section-gap">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 pr--40 pr_md--5 pr_sm--5 order-2 order-xl-1 order-lg-2 order-md-2 order-sm-2 mt_md--30 mt_sm--30">
                            {/* <div className="coupon-input-area-1 login-form">
                                <div className="coupon-area">
                                    <div className="coupon-ask">
                                        <span>Returning customers?</span>
                                        <button className="coupon-click"> Click here to login</button>
                                    </div>
                                    <div className="coupon-input-area">
                                        <div className="inner">
                                            <p>If you have shopped with us before, please enter your details below. If you are a new customer, please proceed to the Billing section.</p>
                                            <form action="#">
                                                <input type="email" placeholder="User Name..." />
                                                <input type="password" placeholder="Enter password..." />
                                                <button type="submit" className="btn-primary rts-btn">Log In</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            {/* <div className="coupon-input-area-1">
                                <div className="coupon-area">
                                    <div className="coupon-ask  cupon-wrapper-1">
                                        <button className="coupon-click">Have a coupon? Click here to enter your code</button>
                                    </div>
                                    <div className="coupon-input-area cupon1">
                                        <div className="inner">
                                            <p className="mt--0 mb--20"> If you have a coupon code, please apply it below.</p>
                                            <div className="form-area">
                                                <input type="text" placeholder="Enter Coupon Code..." />
                                                <button type="submit" className="btn-primary rts-btn">Apply Coupon</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <div className="rts-billing-details-area">
                                <h3 className="title">Billing Details</h3>
                                <form onSubmit={updateAddress}>
                                    <div className="single-input">
                                        <label htmlFor="email">Email Address*</label>
                                        <input id="email" type="text" value={email} readOnly />
                                    </div>
                                    <div className="half-input-wrapper">
                                        <div className="single-input">
                                            <label htmlFor="f-name">First Name*</label>
                                            <input id="f-name" type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                                        </div>
                                        <div className="single-input">
                                            <label htmlFor="l-name">Last Name*</label>
                                            <input id="l-name" type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                                        </div>
                                    </div>
                                    {/* <div className="single-input">
                                        <label htmlFor="comp">Company Name (Optional)*</label>
                                        <input id="comp" type="text" />
                                    </div> */}
                                    <div className="single-input">
                                        <label htmlFor="country">Country / Region*</label>
                                        <input id="country" type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
                                    </div>
                                    <div className="single-input">
                                        <label htmlFor="street">Street Address*</label>
                                        <input id="street" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                                    </div>
                                    <div className="single-input">
                                        <label htmlFor="city">Town / City*</label>
                                        <input id="city" type="text" value={town} onChange={(e) => setTown(e.target.value)} />
                                    </div>
                                    <div className="single-input">
                                        <label htmlFor="state">State*</label>
                                        <input id="state" type="text" value={state} onChange={(e) => setState(e.target.value)} />
                                    </div>
                                    <div className="single-input">
                                        <label htmlFor="zip">Zip Code*</label>
                                        <input id="zip" type="text" value={zipcode} onChange={(e) => setZipcode(e.target.value)} />
                                    </div>
                                    <div className="single-input">
                                        <label htmlFor="phone">Phone*</label>
                                        <input id="phone" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                    </div>
                                    {/* <div className="single-input">
                                        <label htmlFor="ordernotes">Order Notes*</label>
                                        <textarea id="ordernotes" defaultValue={""} />
                                    </div> */}
                                    <button className="rts-btn btn-primary">Update Address</button>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-4 order-1 order-xl-2 order-lg-1 order-md-1 order-sm-1">
                            <h3 className="title-checkout">Your Order</h3>
                            <div className="right-card-sidebar-checkout">
                                <div className="top-wrapper">
                                    <div className="product">
                                        Products
                                    </div>
                                    <div className="price">
                                        Price
                                    </div>
                                </div>

                                {

                                    orders.map((order) => (
                                        <div className="single-shop-list" key={order._id}>
                                            <div className="left-area">
                                                <a href="#" className="thumbnail">
                                                    <img src={order.productId.images[0].url} />
                                                </a>
                                                <a href="#" className="title">
                                                {order.productId.title}
                                                </a>
                                            </div>
                                            <span className="price">₹ {order.productId.sellingprice * order.quantity}</span>
                                        </div>
                                    ))
                                }
                                <div>
                                    {/* <div className="single-shop-list">
                                        <div className="left-area">
                                            <span>Subtotal</span>
                                        </div>
                                        <span className="price">$500.00</span>
                                    </div>
                                    <div className="single-shop-list">
                                        <div className="left-area">
                                            <span>Shipping</span>
                                        </div>
                                        <span className="price">Flat rate: $500.00</span>
                                    </div> */}
                                    <div className="single-shop-list">
                                        <div className="left-area">
                                            <span style={{ fontWeight: 600, color: '#2C3C28' }}>Total Price:</span>
                                        </div>
                                        <span className="price" style={{ color: '#629D23' }}>₹ {totalPrice()}</span>
                                    </div>
                                </div>


                                <div className="cottom-cart-right-area">

                                    <ul>
                                        <li>
                                            <input type="radio" id="s-option" name="selector" value={'cash'} onChange={(e) => setPaymentMethod(e.target.value)} />
                                            <label htmlFor="s-option">Cash On Delivery</label>
                                            <div className="check">
                                                <div className="inside" />
                                            </div>
                                        </li>
                                        <li>
                                            <input type="radio" id="t-option" name="selector" value={'online'} onChange={(e) => setPaymentMethod(e.target.value)} />
                                            <label htmlFor="t-option">Online</label>
                                            <div className="check">
                                                <div className="inside" />
                                            </div>
                                        </li>
                                    </ul>
                                    <p className="mb--20">Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.</p>
                                    <div className="single-category mb--30">
                                        <input id="cat14" type="checkbox" onChange={(e) => setTermsAccepted(e.target.checked)} />
                                        <label htmlFor="cat14"> I have read and agree terms and conditions *
                                        </label>
                                    </div>
                                    {/* <a className="rts-btn btn-primary"  disabled={handleButtonDisabled}>Place Order</a> */}
                                    <a
                                        className="rts-btn btn-primary"
                                        disabled={buttondisabled}
                                        style={{
                                            backgroundColor: buttondisabled ? '#ccc' : '#629D23', // Change color based on disabled state
                                            cursor: buttondisabled ? 'not-allowed' : 'pointer', // Change cursor to indicate disabled state
                                            opacity: buttondisabled ? 0.6 : 1 // Reduce opacity when disabled
                                        }}
                                        onClick={() => {
                                            if (!buttondisabled) {
                                                handlePayment()
                                            }
                                        }}
                                    >
                                        Place Order
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <ToastContainer autoClose={3000} closeButton={false} />
        </>
    )
}

export default Checkout
