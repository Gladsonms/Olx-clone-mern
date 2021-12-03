import { useState, useEffect } from "react";
import "./Create.css";
import Header from "../Header/Header";
import axios from "axios";
import { URL } from "../../Constants/api";

import { useHistory } from "react-router-dom";

const Create = () => {
  let history = useHistory();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [preivewSource, setPreviewSource] = useState("");
  const [base64, Setbase64] = useState("");

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const createProducts = async (e) => {
    e.preventDefault();

    uploadImage(preivewSource);

    let productdetails = { name, category, price, preivewSource };
    console.table(productdetails);
    try {
      await axios
        .post(`${URL}/users/createpost`, productdetails)
        .then((result) => {
          history.push("/");
        });
    } catch (error) {
      console.error(error);
    }
  };

  const uploadImage = (base64EncodedImage) => {
    // console.log(base64EncodedImage);
    Setbase64(base64EncodedImage);
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
            {preivewSource && (
              <img
                alt="Posts"
                width="200px"
                height="200px"
                src={preivewSource}
              ></img>
            )}

            <br />
            <input
              type="file"
              // value={image}
              onChange={(e) => {
                setImage(e.target.files[0]);
                previewFile(e.target.files[0]);
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
