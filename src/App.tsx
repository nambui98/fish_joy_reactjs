import React, { useEffect, useState } from "react";

import io, { Manager } from 'socket.io-client';
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import roomImg from "./room.png";
import memberImg from "./member.png";
import "./App.css";
import { Room } from "./models/room";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [data, setData] = useState<Room[]>()
  const [token, setToken] = useState<string>(localStorage.getItem("token") ?? '')
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [isReload, setIsReload] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [isConnected, setIsConnected] = useState<boolean>();
  const [socket, setSocket] = useState<any>(null);
  const [timeCountDown, setTimeCountDown] = useState<number>(-1)
  const [startCountDown, setStartCountDown] = useState(false)

  useEffect(() => {
    if (!token) {
      const min = 1;
      const max = 100;
      const rand = min + Math.random() * (max - min);
      fetch(process.env.REACT_APP_BASE_URL + "/fish-hunter/token", {
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
            localStorage.setItem('token', result.token);
            localStorage.setItem('user', JSON.stringify(result.user));
            localStorage.setItem('id', JSON.stringify(result.user.id));
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
      console.log(`${process.env.REACT_APP_BASE_URL}?playerId=${user.id}`);
      let socket = io(`${process.env.REACT_APP_BASE_URL}?playerId=${user.id}`, { autoConnect: true, transports: ['websocket'], upgrade: false });
      setSocket(socket)
    }
  }, [token])

  useEffect(() => {
    if (token) {
      fetch(process.env.REACT_APP_BASE_URL + "/fish-hunter/rooms", {
        headers: new Headers({
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }),
      })
        .then(res => {
          if (res.ok)
            return res.json()
          else {
          }
        })
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
    fetch(process.env.REACT_APP_BASE_URL + "/fish-hunter/room/join", {
      method: "POST",
      body: JSON.stringify(room),
      headers: new Headers({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }),
    })
      .then(res => {
        if (res.ok)
          return res.json()
        else {
          debugger
          toast("Something went wrong");
          console.log(res) ///error message for server should be in this response object only
        }
      })
      .then(
        (result) => {
          setIsReload((isReload) => !isReload);
        },
        (error) => {
          toast("Wow so easy !");
        }
      ).catch((error) => { debugger })
  }

  useEffect(() => {
    if (socket && token) {
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
      socket.on('connect', () => {
        setIsConnected(true);
      });
      socket.on('room_members_changed', () => {
        console.log("room_members_changed");
        setIsReload((isReload) => !isReload);
      });
      socket.on('init_game', () => {
        console.log('init_game');
        window.location.href = '/game.html'
      })
      socket.on('disconnect', () => {
      });
      return () => {
        socket.disconnect();
        // socket.off('connect');
        // socket.off('start_game');
        // socket.off('room_members_changed');
        // socket.off('disconnect');
      };
    }

  }, [token, socket]);
  useEffect(() => {
    function tick() {
      setTimeCountDown((time) => {
        if (time - 1 < 0) {

          setStartCountDown(false);
          // navigate('/game')
          window.location.href = '/game.html'
        }
        return time - 1;
      });

    }

    if (startCountDown) {
      let interval = setInterval(tick, 1000);
      return () => clearInterval(interval);
    } else {

    }

  }, [startCountDown])

  const sendPing = () => {
    socket.emit('ping');
  }
  // return (
  //   <Switch>
  //     <Route exact path="/">
  //       <Home />
  //     </Route>
  //     <Route path="/about">
  //       <About />
  //     </Route>
  //     {/* Can also use a named `children` prop */}
  //     <Route path="/users/:id" children={<User />} />
  //   </Switch>
  // )
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
        </div>
        {
          startCountDown &&
          <div className="countDown">
            <p>
              {timeCountDown}
            </p>
          </div>
        }


      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
