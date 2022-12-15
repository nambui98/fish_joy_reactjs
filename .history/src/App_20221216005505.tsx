import React from "react";
import logo from "./logo.svg";
import room from "./room.png";
import member from "./member.png";
import "./App.css";

function App() {
  useEffect(() => {
    fetch("https://api.example.com/items")
      .then(res => res.json())
      .then(
        (result) => {
          // this.setState({
          //   isLoaded: true,
          //   items: result.items
          // });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          // this.setState({
          //   isLoaded: true,
          //   error
          // });
        }
      )
  }, [third])

  return (
    <div className="App">
      <div className="main">
        <div className="frame">
          <div className="rooms">
            {[...Array(100)].map((x, i) =>
              <div className="room" >
                <p className="room_number">
                  {i}
                </p>
                <img src={room} alt="" />
                <div className="room_members">
                  <img src={member} alt="" />
                  <img src={member} alt="" />
                  <img src={member} alt="" />
                  <img src={member} alt="" />
                </div>
              </div>

            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
