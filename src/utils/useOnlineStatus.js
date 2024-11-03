import { useEffect, useState } from "react";

/* 
- this hook is associated with a component i.e it's doesn't have a lifecycle.

- we want to add an eventListener once. HOW ? using useEffect(cb, []);

- check if we're online or offline -> return a boolean value -> based on it the component will display specific UI.

- hooks used within useOnlineStatus belongs to the Component calling useOnlineStatus. So changing value of state variable -> Component will re-render && UI update.

*/
const useOnlineStatus = () => {
  const [onlineStatus, setOnlineStatus] = useState(true);

  useEffect(() => {
    window.addEventListener("online", () => {
      setOnlineStatus(true);
    });

    window.addEventListener("offline", () => {
      setOnlineStatus(false);
    });
  }, []);

  return onlineStatus;
};

export default useOnlineStatus;
