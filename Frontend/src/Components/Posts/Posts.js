import React, { useEffect, useState } from "react";

import Heart from "../../assets/Heart";
import "./Post.css";
import { URL } from "../../Constants/api";

import axios from "axios";

function Posts() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getAllProducts();
  }, []);
  const getAllProducts = async () => {
    try {
      await axios
        .get(`${URL}/users/`)
        .then((res) => setProducts(res.data.products));
    } catch (error) {
      console.error(error);
    }
  };
  console.log(products);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        {products &&
          products.map((product) => {
            return (
              <div key={product.id} className="cards">
                <div className="card">
                  <div className="favorite">
                    <Heart></Heart>
                  </div>
                  <div className="image">
                    <img src={product.image} alt="image" />
                  </div>
                  <div className="content">
                    <p className="rate">&#x20B9; {product.price}</p>
                    <span className="kilometer">{product.product}</span>
                    <p className="name"> {product.category}</p>
                  </div>
                  <div className="date">
                    <span>Tue May 04 2021</span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
