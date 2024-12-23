import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../utils/api';



function AddProduct() {

  const [title, setTitle] = useState("");
  const [images, setImages] = useState([])
  const [description, setDescription] = useState("")
  const [selectedCategory, setselectedCategory] = useState("")
  const [brandName, setBrandName] = useState("")
  const [weight, setWeight] = useState("")
  const [originalprice, setOriginalPrice] = useState("")
  const [discount, setDiscount] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const[sellingPrice,setSellingPrice] = useState("")

  const [fetchedCategories, setFetchedCategories] = useState([])

  const fileInputRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData();
    formData.append('title', title)
    formData.append('description', description)
    formData.append('category', selectedCategory)
    formData.append('brandname', brandName)
    formData.append('weight', weight)
    formData.append('originalprice', originalprice)
    formData.append('sellingprice', sellingPrice)
    formData.append('discount', discount)
    formData.append('type',  selectedType)


    images.forEach((image) => formData.append("images", image))

    // printing from data on console
    //   for(let [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }

    if (!title || !images || !description || !selectedCategory || selectedCategory == "" || !brandName || !weight || !originalprice || !discount) {
      toast.error("All fileds are required")
    } else {
      if (images.length > 5) {
        toast.error("Only 5 images upload")
      } else {
        const toastId = toast.loading("Please wait ...")
        try {
          const response = await api.post('/api/addproduct', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          })
          toast.update(toastId, {
            render: response.data.message,
            type: "success",
            isLoading: false,
            autoClose: 3000
          })
          // console.log(response.data.message)
          setTitle("")
          setDescription("")
          setImages([])
          setselectedCategory("")
          setBrandName("")
          setWeight("")
          setOriginalPrice("")
          setSellingPrice("")
          setDiscount("")
          setSelectedType("")
          fileInputRef.current.value = null
        } catch (error) {
          toast.update(toastId, {
            render: error.response.data.message,
            type: "error",
            isLoading: false,
            autoClose: 3000
          })
          console.error(`Error in uploading product : ${error}`)
        }
      }
    }
  }

  useEffect(()=>{
    if(originalprice==""){
      setSellingPrice("")
    }
    setSellingPrice(Math.ceil(originalprice - ((originalprice*discount)/100)))
  },[discount,sellingPrice])

  useEffect(() => {
    const fetchedCategory = async () => {
    
      try {
        const response = await api.get('/api/allcategory')
        setFetchedCategories(response.data.categories)
        // console.log(response.data.categories)
      } catch (error) {
        console.log(`Error in fetching category : ${error.response}`)
      }
    }
    fetchedCategory()
  }, [])


  return (
    <>
      <form onSubmit={handleSubmit} className="account-details-area" encType="multipart/form-data">
        <h2 className="title">Add Product</h2>
        <div className="input-half-area">
          <div className="single-input">
            <input type="text" placeholder="Product name" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
        </div>
        <div style={{ margin: '20px 0' }}>
          <input
            type="file"
            multiple
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',
              width: '100%',
              backgroundColor: '#f9f9f9',
            }}
            ref={fileInputRef}
            onChange={(e) => setImages([...e.target.files])}
          />
        </div>
        <select
          style={{
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            width: '100%',
            backgroundColor: '#f9f9f9',
            cursor: 'pointer',
            fontSize: '16px',
            marginTop: "-20px",
            marginBottom: "10px"
          }}
          onChange={(e) => setselectedCategory(e.target.value)}
          value={selectedCategory}
        >
          <option disabled value="">Select a Category</option>
          {
            fetchedCategories.map((category, index) => (
              <option value={category.catname} key={index}>{category.catname}</option>
            ))
          }

        </select>

        <select
          style={{
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            width: '100%',
            backgroundColor: '#f9f9f9',
            cursor: 'pointer',
            fontSize: '16px',
            marginTop: "10px",
            marginBottom: "10px"
          }}
          onChange={(e)=> setSelectedType(e.target.value)}
          value={selectedType}
        >
          <option disabled value="">Select a Type</option>
              <option value={"featuredGrocery"}>Featured Grocery</option>           
              <option value={"productWithDiscount"}>Products With Discounts</option>           
              <option value={"weeklyBestSellingGroceries"}>Weekly Best Selling Groceries</option>           
              <option value={"topTrendingProducts"}>Top Trending Products</option>           
        </select>

        <input type="text" placeholder="Product Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        {/* <input type="text" placeholder="Product Category" value={category} onChange={(e) => setCategory(e.target.value)} /> */}
        <div className="input-half-area">
          <div className="single-input">
            <input type="text" placeholder="Brand name" value={brandName} onChange={(e) => setBrandName(e.target.value)} />
          </div>
          <div className="single-input">
            <input type="text" placeholder="Weight *" value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
        </div>
        <div className="input-half-area">
          <div className="single-input">
            <input type="number" placeholder="Orignal Price" value={originalprice} onChange={(e) => setOriginalPrice(e.target.value)} />
          </div>
          <div className="single-input">
            <input type="number" placeholder="Discount" value={discount} onChange={(e) => setDiscount(e.target.value)} />
          </div>
          <div className="single-input">
            <input type="number" placeholder="Selling Price" value={sellingPrice == "" ? "" : sellingPrice} readOnly/>
          </div>
        </div>
        <button className="rts-btn btn-primary" type='submit'>Save Change</button>
      </form>
      <ToastContainer autoClose={3000} closeButton={false} />
    </>
  )
}

export default AddProduct
