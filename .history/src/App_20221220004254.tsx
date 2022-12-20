import React, { useEffect, useState } from "react";

import io, { Manager } from 'socket.io-client';

import roomImg from "./room.png";
import memberImg from "./member.png";
import "./App.css";
import { Room } from "./models/room";

// const socket = io('http://api.fuwo.vn/?playerId=103');
function App() {
  const [data, setData] = useState<Room[]>()
  const [token, setToken] = useState<string>(localStorage.getItem("token") ?? '')
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [isReload, setIsReload] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [isConnected, setIsConnected] = useState<boolean>();
  const [lastPong, setLastPong] = useState('');
  const [socket, setSocket] = useState<any>();

  // let socket = io('http://api.fuwo.vn/?playerId=103');

  useEffect(() => {
    if (!token) {
      const min = 1;
      const max = 100;
      const rand = min + Math.random() * (max - min);
      fetch("http://api.fuwo.vn/fish-hunter/token", {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          username: 'nam' + rand
        })
      })
        .then(res => res.json())
        .then(
          (result) => {
            setToken(result.token)
            // const manager = new Manager("ws://api.fuwo.vn", {
            //   reconnectionDelayMax: 10000,
            //   query: {
            //     "playerId": "125"
            //   }
            // });
            let aaaa = io(`ws://api.fuwo.vn/`, {
              reconnectionDelayMax: 10000,
              query: {

                "playerId": "125"
              }
            });
            setSocket(aaaa)
            debugger
            localStorage.setItem('token', result.token);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }
  }, [token])


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
            setData(result)
          },
          (error) => {
          }
        )
    }
  }, [token, isReload])
  const handleJoin = (room: Room) => {
    fetch("http://api.fuwo.vn/fish-hunter/room/join", {
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
  console.log(isLoaded)
  console.log(error)

  useEffect(() => {

  }, [token])

  useEffect(() => {
    if (socket && token) {
      debugger
      console.log(socket);

      socket.on('connect', () => {

        debugger
        console.log("Connect")
        setIsConnected(true);
      });

      socket.on('room_members_changed', () => {

        debugger
      });
      socket.on('game_play', () => {
        console.log('game_play');

        debugger
      });
      socket.on('disconnect', () => {
        debugger
        setIsConnected(false);
      });



      return () => {
        socket.off('connect');
        socket.off('disconnect');
      };
    }

  }, [token, socket]);

  const sendPing = () => {
    socket.emit('ping');
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
