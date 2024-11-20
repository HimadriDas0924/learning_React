import React, { lazy, Suspense, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
/* 
- createBrowserRouter creates a routing configuration for us && RouterProvide provides this routing configuration to our app. Outlet is a Component which replaces itself with the reqd component based on the route.
- React Outlet is a Component provided by React Router that serves as a placeholder for Children Components based on children routes. It allows for loading dynamic components based on different routes.
*/

// import Grocery from "./components/Grocery";
/* 
- lazy loading (i.e whatever we're going to load using lazy loading, won't be included into the main bundle, rather when needed it will be separately loaded)

- to use lazy loading: use the function lazy() that react provides && don't import Grocery Component directly into app.js else gets included in bundles.

*/

const Grocery = lazy(() => import("./components/Grocery"));

/* 
- AppLayout component has 2 components as it's children: <Header/><Body/>. Now based on route, I want to put <About/> or <Contact/> instead of <Body/>. 
- "react-router-dom" provides another Component called: "Outlet", which puts automatically replaces itself with the specified Component based on the route. 
*/
const AppLayout = () => {
  // AppLayout component -> so we can use hooks inside it.
  const [theme, setTheme] = useState("light");

  // for reload: check for which theme to maintain:
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }

  const toggleTheme = () => {
    // set the theme of the body
    console.log("toggleTheme called!");

    if (localStorage.getItem("theme") !== "dark") {
      document.body.classList.add("dark"); // all the dark class of tailwind gets activated
      localStorage.setItem("theme", "dark");
      setTheme("dark"); // for AppLayout re-render
    } else {
      document.body.classList.remove("dark");
      localStorage.removeItem("theme");
      setTheme("light");
    }
  };

  return (
    <div className="app min-h-screen dark:bg-gray-700 dark:text-white">
      <Header toggleTheme={toggleTheme} />
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
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<h2>Loading....</h2>}>
            <Grocery />
          </Suspense>
        ),
      },
    ],
    errorElement: <Error />,
  },
]);

const reactRoot = ReactDOM.createRoot(document.getElementById("root"));

// reactRoot.render(<AppLayout />);
reactRoot.render(<RouterProvider router={appRouter} />);
