import { useRouteError } from "react-router-dom"; // there could be different types of error: so we can read different types of error using 'useRouteError' and show the user some specific error details

const Error = () => {
  const err = useRouteError(); // "react-router-dom" will catch the error and return an object containing details of the error: so this way we can show dynamic error pages.

  console.log(err);

  return (
    <div>
      <h1>OOPS!!!</h1>
      <h2>
        {err.status} : {err.statusText}
      </h2>
    </div>
  );
};

export default Error;
