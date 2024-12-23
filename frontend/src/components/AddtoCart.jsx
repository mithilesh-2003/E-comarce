import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from "react-toastify";
import api from '../utils/api';
import { Link } from 'react-router-dom';

function AddtoCart({productId,userId}) {

    const [quantity, setQuantity] = useState(1);

    const handleInc = () => {
        setQuantity((prev) => prev + 1)
    }

    const handleDec = () => {
        if (quantity != 1) {
            setQuantity((prev) => prev - 1)
        } else {
            setQuantity(1)
        }
    }

    const handleAddtoCart = async()=>{
        const data = {productId, userId, quantity}
        try {
            const response = await api.post('/api/addtocart', data)
            // console.log(response)
            toast.success(response.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
            // console.log(error)
        }
    }

    return (
        <>
            <div className="cart-counter-action">
                <div className="quantity-edit">
                    <input type="text" className="input" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                    <div className="button-wrapper-action">
                        <button className="button" onClick={handleDec}>
                            <i className="fa-regular fa-chevron-down" />
                        </button>
                        <button className="button plus" onClick={handleInc}>
                            +<i className="fa-regular fa-chevron-up" />
                        </button>
                    </div>
                </div>
                <Link  className="rts-btn btn-primary radious-sm with-icon" onClick={handleAddtoCart}>
                    <div className="btn-text">Add</div>
                    <div className="arrow-icon">
                        <i className="fa-regular fa-cart-shopping" />
                    </div>
                    <div className="arrow-icon">
                        <i className="fa-regular fa-cart-shopping" />
                    </div>
                </Link>
            </div>
            <ToastContainer autoClose={1000} closeButton={false} />
        </>
    )
}

export default AddtoCart
