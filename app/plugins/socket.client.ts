import { io } from "socket.io-client";


export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const socket = io(config.public.API_URL, {
    autoConnect: false,
    transports: ["websocket"],
  });

  return {
    provide: {
      socket,
    },
  };
});