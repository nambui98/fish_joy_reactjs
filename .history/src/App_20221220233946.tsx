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
  const [socket, setSocket] = useState<any>();
  const [timeCountDown, setTimeCountDown] = useState<number>(-1)

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
            debugger
            localStorage.setItem('token', result.token);
            localStorage.setItem('user', JSON.stringify(result.user));
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
      let user = JSON.parse(localStorage.getItem('user')!);
      debugger
      setSocket(io(`http://api.fuwo.vn/?playerId=${user.id}`))
      fetch("http://api.fuwo.vn/fish-hunter/rooms", {

        headers: new Headers({
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }),
      })
        .then(res => res.json())
        .then(
          (result) => {
            console.log("isreload");

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
        console.log("room_members_changed");
        debugger
        setIsReload((isReload) => !isReload);
      });
      socket.on('start_game', (res: any) => {
        console.log(res);
        setTimeCountDown(res.time);
        console.log('start_game');

        debugger
      });
      socket.on('game_play', (res: any) => {
        console.log(res);

        console.log('game_play');

        debugger
      });
      socket.on('disconnect', () => {
        setIsConnected(false);
      });
      return () => {
        socket.off('connect');
        socket.off('disconnect');
      };
    }

  }, [token, socket]);
  useEffect(() => {
    function tick() {

      setTimeCountDown((time) => time - 1);
    }

    if (timeCountDown > 0) {
      let interval = setInterval(tick, 1000);
      return () => clearInterval(interval);
    }

  }, [])

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
          </div>
          <div className="countDown">{timeCountDown >= 0 && timeCountDown}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
