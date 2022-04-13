import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [website, setwebsite] = useState([]);

  // const urls = {
  //   url: website,
  //   base: "https://"
  // }

  const handle = () => {
    var data = JSON.parse(localStorage.getItem('Websites'))
    var list = data ? data : []

    axios.get(`https://${website}`)
      .then(res => {
        const status = res.data;
        // this.setState({ persons });
        console.log(res);
      })

    list.push({
      urls: website,
      status: "error",
      title: ""
    })
    localStorage.setItem('Websites', JSON.stringify(list));
  };

  return (
    <div>
      <div className="container header">
        <div className="row justify-content-between align-items-center">
          <div className="col-md-6 text-start">
            <p className="header-heading">LIVE WEBSITE TRACKING</p>
          </div>
          <div className="col-md-6 text-end">
            <p className="tracking-count">Currently tracking 4 websites</p>
          </div>
        </div>
      </div>
      <hr />
      <div className="container main">
        <div className="row justify-content-between">
          <div className="col-md-10">
            <input
              type="text"
              placeholder="Input with URL Validation"
              className="input-box"
              value={website}
              onChange={(e) => setwebsite(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <button type="button" className="btn add-website-btn" onClick={handle}>
              ADD WEBSITE
            </button>
          </div>
        </div>
        <div className="row align-items-center">
          <p className="websites-heading">WEBSITES</p>
          <div className="col-md-9">
            <p className="website-title">Explore appliances, recipes and accessories from Usha Cook</p>
            <p className="website-url">ushacook.com</p>
          </div>
          <div className="col-md-2">
            <p className="last-checked">Last checked: 5 minutes ago</p>
          </div>
          <div className="col-md-1">
            <button type="button" className="btn btn-success fetch-button">
              LIVE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
