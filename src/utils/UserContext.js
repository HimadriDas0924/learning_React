import { createContext } from "react";

// a context not necessarily has to be an object.
// in the context, initially we assign default value. But as per our need we update the value
const UserContext = createContext({
  loggedInUser: "default user",
});

export default UserContext;
