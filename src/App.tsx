import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import roomImg from "./room.png";
import memberImg from "./member.png";
import "./App.css";
import { Room } from "./models/room";

function App() {
  const [data, setData] = useState<Room[]>()
  const [token, setToken] = useState<string>(localStorage.getItem("token") ?? '')
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [isReload, setIsReload] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  useEffect(() => {
    if (!token) {
      fetch("https://api.fuwo.vn/fish-hunter/token", {
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
            localStorage.setItem('token', result.token);
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
      fetch("https://api.fuwo.vn/fish-hunter/rooms", {
        headers: new Headers({
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }),
      })
        .then(res => res.json())
        .then(
          (result) => {
            setData(result)
          },
          (error) => {
          }
        )
    }
  }, [token, isReload])
  const handleJoin = (room: Room) => {
    fetch("https://api.fuwo.vn/fish-hunter/room/join", {
      method: "POST",
      body: JSON.stringify(room),
      headers: new Headers({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }),
    })
      .then(res => res.json())
      .then(
        (result) => {
          setIsReload((isReload) => !isReload);
          // alert("success " + result)
          // debugger
        },
        (error) => {
        }
      )

  }
  return (
    <div className="App">
      <div className="main">
        <div className="frame">
          <div className="rooms">
            {data?.map((room, index) =>
              <div key={room.id} className="room" onClick={() => handleJoin(room)} >
                <p className="room_number">
                  {room.id}
                </p>
                <img src={roomImg} alt="" />
                <div className="room_members">
                  {
                    room.roomMembers.map((member, indexMem) =>
                      <img src={memberImg} alt="" key={indexMem} />
                    )
                  }

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
