import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../../utils/api';
import { toast, ToastContainer } from 'react-toastify';

const ProductTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 15px;
  text-align: left;

  th, td {
    padding: 12px 15px;
    border: 1px solid #ddd;
  }

  th {
    background-color: #f4f4f4;
    color: #333;
  }

  tr:hover {
    background-color: #f1f1f1;
  }

  td button {
    margin: 0 5px;
    padding: 5px 10px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
  }

  .see-btn {
    background-color: #4CAF50;
    color: white;
  }

  .edit-btn {
    background-color: #FFC107;
    color: white;
  }

  .delete-btn {
    background-color: #F44336;
    color: white;
  }
`;

const AllProducts = () => {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get('/api/allproducts')
        setProducts(response.data.products)
        setLoading(false)
        // console.log(response)
      } catch (error) {
        setLoading(false)
        console.log(error)
      }
    }
    fetchProduct()
  }, []);

  const handleDeleteProduct = async(id)=>{
    // console.log(id)
    const toastId = toast.loading("Please wait ...")
    try {
      const response = await api.get(`/api/productdelete/${id}`)
      // console.log(response)
      setProducts(products.filter((product)=> product._id != id))
      toast.update(toastId, {
        render: response.data.message,
        type: "success",
        isLoading: false,
        autoClose: 3000
      })
    } catch (error) {
      toast.update(toastId, {
        render: error.response.data.message,
        type: "error",
        isLoading: false,
        autoClose: 3000
      })
      // console.log(error)
    }
  }

  if (loading) {
    return (
      <h1>Loading...</h1>
    )
  }
  return (

    <div>
      <h5>Product List ({products.length})</h5>
      <ProductTable>
        <thead>
          <tr>
            <th>Sl. No</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
          products.length > 0 ? products.map((product, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{product.title}</td>
              <td> ₹{product.sellingprice}  <del>{product.originalprice}</del></td>
              <td>{product.category}</td>
              <td>
                {/* <button className="see-btn">See</button> */}
                <button className="edit-btn">Edit</button>
                <button className="delete-btn" onClick={()=>handleDeleteProduct(product?._id)}>Delete</button>
              </td>
            </tr>
          )) : <tr><td colSpan={5}><h4>No product found</h4></td></tr>
          }
        </tbody>
      </ProductTable>
      <ToastContainer autoClose={3000} closeButton={false} />
    </div>
  );

};

export default AllProducts;
