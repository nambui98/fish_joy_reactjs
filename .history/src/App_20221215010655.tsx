import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="main">
        <div className="frame">
          <div className="rooms">
            {[...Array(100)].map((x, i) =>
              <div className="room" >
                <div>
                  <p className="room_number">
                    {i}
                  </p>
                  <img src="./public/room.png" alt="" />
                  <div className="room_members">
                    <img src="../public/member.png" alt="" />
                    <img src="../public/member.png" alt="" />
                    <img src="../public/member.png" alt="" />
                    <img src="../public/member.png" alt="" />
                  </div>
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