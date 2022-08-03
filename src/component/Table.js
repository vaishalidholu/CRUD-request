import { keyboard } from "@testing-library/user-event/dist/keyboard";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Table(props) {
  const [data, setData] = useState([{}]);
  useEffect(() => {
    getuser();
    console.log(data);
  }, []);
  const getuser = async () => {
    await axios.get("http://localhost:4000/posts").then((res) => {
      console.log("res", res);
      setData(res.data);
    });
  };
  const handleDelete = async (id) => {
    console.log("handleDelete");
    await axios
      .delete("http://localhost:4000/posts/" + id)
      .then((res) => getuser());
  };
  return (
    <div>
      <table className="table table-dark table-hover">
        <thead>
          <tr>
            <th scope="col">User Name</th>
            <th scope="col">E-mail</th>
            <th scope="col">password</th>
            <th scope="col">Number</th>
            <th scope="col">Action</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((user) => (
              <tr>
                <th scope="row">{user.name}</th>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.Number}</td>
                <td>
                  <button onClick={() => props.edit(user)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(user.id)}>delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
