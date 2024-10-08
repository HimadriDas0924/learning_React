import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"; // createBrowserRouter creates a routing configuration for us && RouterProvide provides this routing configuration to our app. Outlet is a Component which replaces itself with the reqd component based on the route.
// React Outlet is a Component provided by React Router that serves as a placeholder for Children Components based on children routes. It allows for loading dynamic components based on different routes.

/* 
- AppLayout component has 2 components as it's children: <Header/><Body/>. Now based on route, I want to put <About/> or <Contact/> instead of <Body/>. 
- "react-router-dom" provides another Component called: "Outlet", which puts automatically replaces itself with the specified Component based on the route. 
*/
const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
};

// import createBrowserRouter from "react-router-dom"
// pass the configuration inside the createBrowserRouter fn, which will return a router object
// configuration : information that will define what'll happen at a specific route.
// configuration is in the form of a list of objects: each object {path: 'specific route', element: mention the component to load}
// But passing this configuration to createBrowserRouter() is not enough to render it.
// for that: import RouterProvide from "react-router-dom", which will pass this configuration to our app.
// Earlier, we were directly rendering our <AppLayout/> component, But now we'll render the <RouterProvider/> component and pass the router object returned by createBrowserRouter as props to the <RouterProvider/> component. i.e <RouterProvider router = {the obj returned by createBrowserRouter}/>

// NOTE: if a route we're trying to access is not found in the configuration, then "react-router-dom" shows us an error page.

// Now, how to handle nested routes: put children components i.e {path: '/', children: [path objects] i,e {path:'/about', element: <About/>}}.
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,

    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
    errorElement: <Error />, // if error happens: display this Component instead of the page displayed by "react-router-dom".

    // NOTE: putting an error component when error happens at the "/" route, will display this page as Error page for all the other routes.
  },
]);

const reactRoot = ReactDOM.createRoot(document.getElementById("root"));

// reactRoot.render(<AppLayout />);
reactRoot.render(<RouterProvider router={appRouter} />);
