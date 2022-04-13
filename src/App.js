import './App.css';
import React, { useState } from 'react';
// import axios from 'axios';

function App() {
  const [website, setwebsite] = useState([]);

  const handle = async() => {
    var data = JSON.parse(localStorage.getItem('Websites'))


    var list = data ? data : []

    // let obj = {
    //   urls: website,
    //   status: "",
    //   title: "Page Title"
    // }

    await fetch(`www.${website}`)
      .then(res => {
        // if (res.status == "200") {
        //   obj.status = "live"
        // } else {
        //   obj.status = "error"
        // }
        console.log(res.status);
      })
      // .catch(error => {
      //   obj.status = "error";
      // })

    list.push({
      urls: website,
      status: "",
      title: "Page Title"
    })
    localStorage.setItem('Websites', JSON.stringify(list));
    setwebsite("")
  };

  const getData = () => {
    // var data = JSON.parse(localStorage.getItem('Websites'))
    var data = [
      {
        "urls": "ushacook.com",
        "status": "live",
        "title": "Explore appliances, recipes and accessories from Usha Cook"
      },
      {
        "urls": "baragaonweaves.com",
        "status": "live",
        "title": "Baragaon Weaves - Uniquely Yours"
      },
      {
        "urls": "maxestates.in",
        "status": "error",
        "title": "Max Estates | The Real Estate Development Arm of Max Group"
      }, {
        "urls": "merinolaminates.com",
        "status": "fetching",
        "title": "Merino Laminates - The best laminates brand"
      }
    ]
    return data ? data : []
  }

  const getStatus = (status) => {
    switch (status) {
      case "live":
        return (
          "btn btn-success fetch-button"
        )
      case "error":
        return (
          "btn btn-danger fetch-button"
        )
      case "fetching":
        return (
          "btn btn-primary fetch-button"
        )
      default:
        return ("")
    }
  }

  return (
    <div>
      <div className="container header">
        <div className="row justify-content-between align-items-center">
          <div className="col-md-6 text-start">
            <p className="header-heading">LIVE WEBSITE TRACKING</p>
          </div>
          <div className="col-md-6 text-end">
            <p className="tracking-count">Currently tracking {getData().length} websites</p>
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
          {getData().map((data, key) => {
            return <div className="container" key={key}>
              <div className="row align-items-center justify-content-between py-2" style={{ borderLeft: data.status === "error" ? "7px solid #FC5200" : "", marginLeft: data.status === "error" ? "0px" : '' }}>
                <div className="col-md-8">
                  <p className="website-title">{data.title}</p>
                  <p className="website-url" style={{ color: data.status === "error" ? "#FC5200" : "" }} >{data.urls}</p>
                </div>
                <div className="col-md-4">
                  <div className="row text-end align-items-center">
                    <div className="col">
                      <p className="last-checked">Last checked: 5 minutes ago</p>
                    </div>
                    <div className="col-md-4">
                      <button type="button" className={getStatus(data.status)}>
                        {data.status}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="my-2 p-0" />
            </div>
          })}
        </div>
        <div className="row footer-text mt-4">
          <p>This application is a test. It lets users add a list of URLs in local storage. Along with the URL it stores the Title of the page returned when fetching the contents of the URL. The Application then fetches the contents of each URL and checks the response type. If the response is 200 OK, it marks the URL as LIVE. If the response when getting the contents of the website throws an error, the application highlights the errored website in the list. The application does this every 5 minutes or ON DEMAND when the URL is clicked by the user. On reload, the website checks the local storage for the list of websites added and loads all of them again.</p>
          <p>Built for Cobold Digital by Deepak Kumar</p>
        </div>
      </div>
    </div>
  );
}

export default App;
