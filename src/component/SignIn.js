import React, { useState } from "react";
import axios from "axios";
import Table from "./Table";

export default function SignIn() {
  const [active, setActive] = useState(false);
  const [update, setUpdate] = useState(false);
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    Number: "",
    id: 0,
  });
  
  const handleChange = () => {
    setActive(!active);
  };

  const edit = (data) => {
    console.log(data);
    // delete data.id;
    setUpdate(true);
    setInput(data);
  };

  const handleSubmit = async (id) => {
      
    if (update) {
      let response = await axios.put(
        "http://localhost:4000/posts" + input.id,
        input
      );
      if (response) {
        alert("deta submitted success");
      } else {
        alert("something went wrong");
      }
    } else {
      delete input.id;
      let response = await axios.post("http://localhost:4000/posts", input);
      if (response) {
        alert("deta submitted success");
      } else {
        alert("something went wrong");
      }
    }
    setInput({ name: "", email: "", password: "", Number: "" });
  };

  return (
    <div>
      <div className={active ? "active main-div" : "main-div"}>
        <div>
          <div className="username">
            <label>User Name</label>
            <input
              type="text"
              value={input.name}
              onChange={(e) => setInput({ ...input, name: e.target.value })}
            ></input>
          </div>
          <div className="Email">
            <lable>E-mail</lable>
            <input
              type="email"
              value={input.email}
              onChange={(e) => setInput({ ...input, email: e.target.value })}
            ></input>
          </div>
          <div className="password">
            <lable>Password</lable>
            <input
              type="password"
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
            ></input>
          </div>

          <div className="number">
            <lable>Number</lable>
            <input
              type="number"
              value={input.Number}
              onChange={(e) => setInput({ ...input, Number: e.target.value })}
            ></input>
          </div>
          <div className=" btn button">
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
      <div className="Button">
        <button onClick={handleChange}>SignIn</button>
      </div>
      <Table edit={edit} />
    </div>
  );
}
