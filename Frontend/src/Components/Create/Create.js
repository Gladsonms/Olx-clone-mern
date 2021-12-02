import { useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import axios from "axios";
import { URL } from "../../Constants/api";

const Create = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const createProducts = async (e) => {
    e.preventDefault();

    let productdetails = { name, category, price };
    console.table(productdetails);
    try {
      await axios.post(`${URL}/users/createpost`, productdetails);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Header />
      <card>
        <div className="centerDiv">
          <form onSubmit={createProducts}>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input
              className="input"
              type="number"
              id="fname"
              name="Price"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
            <br />

            <br />
            <img alt="Posts" width="200px" height="200px" src=""></img>

            <br />
            <input
              type="file"
              value={image}
              onChange={(e) => {
                setImage(e.target.value);
              }}
            />
            <br />
            <button className="uploadBtn">upload and Submit</button>
          </form>
        </div>
      </card>
    </div>
  );
};

export default Create;
