import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../../Utils/MessageHandle';

export const Home = () => {
  const navigate = useNavigate();
  const [loggedInUser, setloggedInUser] = useState('');
  const [Products, setProducts] = useState([]);
  useEffect(() => {
    setloggedInUser(localStorage.getItem('loggedInUser'));
  }, []);
  const fetchProducts = async () => {
    console.log("Hello world");
    const url = "http://localhost:8080/products";
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    };
    const response = await fetch(url, headers);
    const result = await response.json();
    setProducts(result);
  }
  useEffect(() => {
    fetchProducts();
  }, [])


  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('loggedInUser');
    handleSuccess("Logged out Successfully")
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  }

  return (
    <>
      <div className='container'>
        Welcome {loggedInUser}
      </div>
      {Products && (
        <div>
          <h2>All Products</h2>
          {Products?.map((product, index) => (
            <ul key={index}>
              <span>{product.name} : {product.description}</span>
            </ul>
          ))}
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
      <ToastContainer />
    </>
  )
}

