import { io } from "socket.io-client";

/** Shared socket.io connection for real-time blog updates. Not auto-connected — pages that need it connect on mount and disconnect on unmount. */
export const socket = io(import.meta.env.VITE_BACKEND_URL, { autoConnect: false });
