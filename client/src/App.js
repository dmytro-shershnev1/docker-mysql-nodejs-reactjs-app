import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/user');
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const postData = async () => {
    try {
      const response = await axios.post('/api/user', { data: inputValue });
      console.log(response.data);
      fetchData(); // Fetch data again after posting
    } catch (error) {
      console.error(error);
    }
  };

  const dbinit = async () => {
    try {
      const response = await axios.post('/api/dbinit');
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const tbinit = async () => {
    try {
      const response = await axios.post('/api/tbinit');
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>User Submit Form</h1>
      <input name="input-parameter" onChange={handleChange} />
      <br />
      <br />
      <button onClick={postData}>Submit</button> <br />
      <br />
      <button style={{ backgroundColor: "red" }} onClick={dbinit}>
        DB Init, auto build
      </button>
      <br />
      <br />
      <button style={{ backgroundColor: "orange" }} onClick={tbinit}>
        Table Init, auto build
      </button>
      <br />
      <hr />
      <h2>Users List</h2>
      <center>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </center>
    </div>
  );
}

export default App;
