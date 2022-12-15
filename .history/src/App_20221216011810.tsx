import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import room from "./room.png";
import member from "./member.png";
import "./App.css";
import { Room } from "./models/room";

function App() {
  const [data, setData] = useState<Room[]>()
  const [token, setToken] = useState<string>()
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  useEffect(() => {
    if (!token) {
      fetch("http://api.fuwo.vn/fish-hunter/token", {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          username: "Nam1"
        })
      })
        .then(res => res.json())
        .then(
          (result) => {
            setToken(result.token)
            debugger

          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }
  }, [])


  useEffect(() => {
    if (token) {
      fetch("http://api.fuwo.vn/fish-hunter/rooms", {
        headers: new Headers({
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }),
      })
        .then(res => res.json())
        .then(
          (result) => {
            debugger
            setData(result)
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

    }
  }, [token])

  return (
    <div className="App">
      <div className="main">
        <div className="frame">
          <div className="rooms">
            {data?.map((x, i) =>
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
            {/* {[...Array(100)].map((x, i) =>
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

            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
