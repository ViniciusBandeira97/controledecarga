import { useState } from "react";

export function useDateNow() {
  const [dateToString, setDateToString] = useState("-");

  const count = () => {
    setDateToString(
      new Date().toLocaleString("pt-br", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  };

  setInterval(count, 1000);

  return dateToString;
}
