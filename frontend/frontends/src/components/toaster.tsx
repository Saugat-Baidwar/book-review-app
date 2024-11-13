import { toast } from "react-hot-toast";

export function errorToast(message: string) {
  toast(message, {
    duration: 2000,
    position: "bottom-center",
    style: {
      background: "#ef4444",
      color: "#fff",
    },
  });
}

export function successToast(message: string) {
  toast(message, {
    duration: 2000,
    position: "bottom-center",
    style: {
      background: "#22c55e",
      color: "#fff",
    },
  });
}