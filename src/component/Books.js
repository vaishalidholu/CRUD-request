import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import spinner from "../images/loading.gif";

export default function Books() {
  useEffect(() => {
    user();
    console.log("hi", data);
  }, []);

  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [data, setData] = useState([{}]);
  const [active, setActive] = useState(false);
  const [inputItem, setInputItem] = useState({
    author_id: "",
    title: "",
    pages: "",
    releaseDate: "",
    id: 0,
  });

  const user = async () => {
    setLoading(true);
    await axios.get("http://localhost:4000/books").then((res) => {
      console.log("hello", res);
      setData(res.data);
      setLoading(false);
    });
  };
  const Delete = async (id) => {
    setLoading(true);
    await axios.delete("http://localhost:4000/books/" + id).then((res) => {
      user();
      setLoading(false);
    });
  };
  const handleSubmit = async (id) => {
    console.log("funcaiton called");
    console.log(update);

    if (update) {
      setLoading(true);
      let response = await axios.put(
        "http://localhost:4000/books/" + inputItem.id,
        inputItem
      );
      if (response) {
        // alert("deta submitted success");
        setLoading(false);
        user();
        closeMode();
      } else {
        alert("something went wrong");
      }
    } else {
      setLoading(true);
      let response = await axios.post("http://localhost:4000/books", inputItem);
      console.log("post", response);
      if (response) {
        alert("deta submitted success");
        setLoading(false);
        user();
        closeMode();
      } else {
        alert("something went wrong");
      }
    }
    setUpdate(false);
    setInputItem({ author_id: "", title: "", pages: "", releaseDate: "" });
  };

  const togglemode = () => {
    console.log("togglemode");
    console.log(active);
    setActive(!active);
  };
  const closeMode = () => {
    setActive(false);
  };
  const handleEdit = (data) => {
    setInputItem(data);
    console.log("put", data);
    setUpdate(true);
    setActive(true);
  };

  return (
    <div>
      <div className="btn button ">
        <button onClick={togglemode}>creat</button>
      </div>
      <div className={active ? "active main-div" : "main-div"}>
        <div className="box">
          <div className="close">
            <button onClick={closeMode}>X</button>
          </div>
          <div>
            <label>author_id</label>
            <input
              id="author_id"
              placeholder="author id"
              value={inputItem.author_id}
              onChange={(e) =>
                setInputItem({ ...inputItem, author_id: e.target.value })
              }
            ></input>
          </div>

          <div>
            <label>Title</label>
            <input
              type="text"
              id="title"
              placeholder="title"
              value={inputItem.title}
              onChange={(e) =>
                setInputItem({ ...inputItem, title: e.target.value })
              }
            ></input>
          </div>
          <div>
            <label>pages</label>
            <input
              type="text"
              id="page"
              placeholder="page"
              value={inputItem.pages}
              onChange={(e) =>
                setInputItem({ ...inputItem, pages: e.target.value })
              }
            ></input>
          </div>
          <div>
            <label>releaseDate</label>
            <input
              type="text"
              id="date"
              placeholder="date"
              value={inputItem.releaseDate}
              onChange={(e) =>
                setInputItem({ ...inputItem, releaseDate: e.target.value })
              }
            ></input>
          </div>
          <div className="submit">
            {/* <button onClick={handleSubmit}>Submit</button> */}
            <button onClick={handleSubmit}>Submit</button>
          </div>
          
          <div className="image">
            <img src={spinner} alt="loading" />
          </div>
        </div>
      </div>
      {loading ? (
        <div className="image">
          <img src={spinner} alt="loading" />
        </div>
      ) : (
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th scope="col">author_id</th>
              <th scope="col">title</th>
              <th scope="col">pages</th>
              <th scope="col">releaseDate</th>
              <th scope="col">action</th>
              <th scope="col">action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((user) => (
                <tr>
                  <th scope="row">{user.author_id}</th>
                  <td>{user.title}</td>
                  <td>{user.pages}</td>
                  <td>{user.releaseDate}</td>
                  <td>
                    <button onClick={() => Delete(user.id)}>delete</button>
                  </td>
                  <td>
                    <button onClick={() => handleEdit(user)}>edit</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
