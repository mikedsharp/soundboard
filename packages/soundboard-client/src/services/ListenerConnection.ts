declare var serverAddress: any;

import { io } from "socket.io-client";
let socket: any = null;
export function init() {
  // set up socket.io connection
  if (socket !== null) {
    return socket;
  }

  try {
    if (serverAddress) {
      socket = io(serverAddress);
    } else {
      socket = io(import.meta.env.VITE_SOUND_SERVER_ADDRESS);
    }
  } catch (ex) {
    socket = io(import.meta.env.VITE_SOUND_SERVER_ADDRESS);
  }

  socket.on("get-sounds", (sounds: any) => {
    localStorage.setItem("sounds", JSON.stringify(sounds));
  });

  return socket;
}

export function playSound(sound: any) {
  socket.emit("play-sound", JSON.stringify(sound));
}
