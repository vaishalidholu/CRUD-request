import axios from "axios";
import React, { useEffect, useState } from "react";
import spinner from "../images/loading.gif";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";

export default function Mobiles() {
  const [page , setpage]=useState(0)
  const [data, setData] = useState([{}]);
  const [replace, setReplace] = useState(false);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(false);
  const [getdata, setGetdata] = useState({
    brand: "",
    price: "",
    camera: "",
    country: "",
    id: 0,
  });
  useEffect(() => {
    getUser();
  }, []);
  const togglemode = () => {
    console.log("hello");
    setActive(!active);
  };
  const close = () => {
    setActive(false);
  };
  const handleSubmit = async () => {
    if (replace) {
      console.log("put", getdata.id);
      let response = await axios.put(
        "http://localhost:4000/mobiles/" + getdata.id,
        getdata
      );
      close();
      getUser();
    } else {
      let response = await axios.post("http://localhost:4000/mobiles", getdata);
      if (response) {
        alert("succes");
        getUser();
        close();
      } else {
        alert("something wrong");
      }
    }
    setGetdata({ brand: "", price: "", camera: "", country: "" });
  };
  const getUser = async () => {
    await axios.get("http://localhost:4000/mobiles").then((res) => {
      console.log("hello", res);
      console.log("vaishu", data);
      setData(res.data);
    });
  };

  const fetchData = async () => {
    await axios.get("http://localhost:4000/mobiles").then((res) => {
      setData(data.concat(res.data));
    });
  };
  const deleteUser = async (id) => {
    console.log("delet");
    await axios.delete("http://localhost:4000/mobiles/" + id).then((res) => {
      getUser();
    });
  };

  const EditUser = (data) => {
    setActive(true);
    setReplace(true);
    console.log("data", data);
    setGetdata(data);
  };

  return (
    <div>
      <div className="btn button">
        <button onClick={togglemode}>creat</button>
      </div>
      <div className={active ? "active main-div" : "main-div"}>
        <div className="box">
          <div className="close">
            <button onClick={close}>X</button>
          </div>
          <div>
            <lable>Brand</lable>
            <input
              type="text"
              value={getdata.brand}
              onChange={(e) =>
                setGetdata({ ...getdata, brand: e.target.value })
              }
            />
          </div>
          <div>
            <lable>Price</lable>
            <input
              type="text"
              value={getdata.price}
              onChange={(e) =>
                setGetdata({ ...getdata, price: e.target.value })
              }
            />
          </div>
          <div>
            <lable>Camera</lable>
            <input
              type="text"
              value={getdata.camera}
              onChange={(e) =>
                setGetdata({ ...getdata, camera: e.target.value })
              }
            />
          </div>
          <div>
            <lable>Country</lable>
            <input
              type="text"
              value={getdata.country}
              onChange={(e) =>
                setGetdata({ ...getdata, country: e.target.value })
              }
            />
          </div>
          <div className="submit">
            <button onClick={handleSubmit}>Submit</button>
          </div>
          <div className="image">
            <img src={spinner} alt="loading" />
          </div>
        </div>
      </div>
      <InfiniteScroll
        dataLength={data.length} //This is important field to render the next data
        next={fetchData}
        hasMore={data.length}
        loader={<Spinner />}
      ></InfiniteScroll>
      <table className="table table-success table-striped">
        <thead>
          <tr>
            <th scope="col">Brand</th>
            <th scope="col">Price</th>
            <th scope="col">Camera</th>
            <th scope="col">country</th>
            <th scope="col">action</th>
            <th scope="col">action</th>
          </tr>
        </thead>

        <tbody>
          {data &&
            data.map((user) => (
              <tr key={user.id}>
                <th>{user.brand}</th>
                <th>{user.price}</th>
                <th>{user.camera}</th>
                <th>{user.country}</th>
                <th>
                  <button onClick={() => deleteUser(user.id)}>delete</button>
                </th>
                <th>
                  <button onClick={() => EditUser(user)}>edit</button>
                </th>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
