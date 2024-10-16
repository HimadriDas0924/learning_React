## Important points regarding HOOKS:

### 1. useEffect:

- useEffect basically registers a cb fn, which is called after the complete render of the component i.e after the whole code of fn component is executed.

- dependency array is optional. cb fn is mandatory.

  ### Behaviour of useEffect depends on the dependency array:

  1.  if dependency array is NOT provided => useEffect is called on every render of the component.

  2.  dependency array is empty i.e [] => useEffect is called only on initial render i.e just once.

  3.  dependency array has some dependency i.e dependency array is `[stateVariable]` => useEffect called on initial render + useEffect called everytime the stateVariable changes.

### 2. useState:

- local state variables should be created inside the fn component.

- at the top in the fn component.

- should not be created inside:

  1.  function.
  2.  condition i.e if-else
  3.  loops

  - bcz then there could be some inconsistency between different renders.

## Routing in React Application:

- to perform routing in React application: install a library: `"react-router-dom"` as an npm package.

### - Steps:

1. To do routing: create a configuration in our root-component file.

2. Configuration: specifying on what route, what component to load.

3. import the `createBrowserRouter` fn from react-router-dom and pass in the configuration as argument. Configuration is an array of path objects. path object consists of keys like: path,element,children,errorElement

4. createBrowserRouter(configuration) will return us a `routerObject`.

5. But this is not enough to display different components based on different route. But still we're doing: `ReactRoot.render(<AppLayout />);`

6. To render different components based on routes: import `RouterProvider` from "react-router-dom".

- **NOTE :**

  1. `RouterProvider` is a Component which we need to `render` instead of AppLayout and `pass the routerObject as props`.

  2. react-router-dom: also provides it's own error component which is displayed if the route is not found. So we can create our custom error page component using the `property : errorElement of path object`

  3. we can use a HOOK `useRouteError` provided by "react-router-dom" to get error information.

```javascript
// in MyErrorComponent.js

import { useRouteError } from "react-router-dom";

const MyErrorComponent = () => {
  const err = useRouteError();

  console.log(err); // get which dynamic error info you want to display.

  return <div></div>;
};
```

```javascript
// in app.js

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <Header />
      <Body />
    </div>
  );
};

const routerObj = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <MyErrorComponent />, // custom created error component, && since "/": is prefix to all the routes: so this Error page is displayed for every error.
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/about",
    element: <About />,
  },
]);

ReactRoot.render(<RouterProvider router={routerObj} />);
```

## Nested Route/ Children Route in React:

- children routes are created using the `children` property of a path object, which is an array of path objects.

- **NOTE :** whichever route configuration is found first is consider consider.

- **NOTE :** If we create nested routes via the children property of a path object then go to that path won't be displaying the component specified, `Because still element of the path object would be specific Component only.`

  - To solve this problem: we need to use a component which'd act as the placeholder for the component mentioned in the nested route.

  - import `Outlet` component from react-router-dom for it.

```javascript

import {createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";

// Outlet doesn't take any physical space in DOM. It's just a placeholder.
const AppLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}

// Now, whichever route we hit, if we've provided a configuration of it, <Outlet /> will be replaced by the 'element' of that path.
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Body />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/contact',
        element: <Contact />
      }
    ]
  },
  {
    path: 'nesting1/nesting2' // another way to provide nested routes,
    element: <Something />
  },
  {
    path: '/about', // this is provided above, so this configuration of '/about' is ignored.
    element: <About2 />
  }
])

```

## Don't use `<a>` in React for going to a different route

- bcz it reloads the page.
- instead use: `<Link to = 'path'>` i.e Link Component provided by react-router-dom.
- Useage is same as anchor tag.
- This won't reload the page on hitting a different route, rather just update the components.

```javascript
<Link to="/contact"> Contact </Link>
// click on Contact and you go to the /contact page : generated by updating the components.
```

### This is why React applications are called Single page Applications:

- bcz when we hit a different route, a new page is not loaded, rather the whole component is refreshed/updated.

---

REVISION NOTES: (may contain something different)

## 1. Behaviour of useEffect:

- dependency array is optional.

  1.  if we don't provide dependency array: useEffect is called with every render.

  - && what does useEffect do ?
  - sets up a cb function which is called when the component is completely rendered.

  2.  if dependency array is empty: useEffect is called once i.e on initial render.

  3.  if dependency array contain dependencies (eg: stateVariables): then useEffect is called on initial render + everytime the dependency value changes.

## 2. react-router-dom

- it is used to setup routes i.e based on what route what component to render.

- steps:

  1.  create a path configuration i.e on what path : what component to render. => `createBrowserRouter` => takes an array of path objects => returns a routerObject.

  2.  Now, just creating this object doesn't render anything based on path, bcz we're doing `ReactRoot.render(<AppComponent/>)`.

  - So, "react-router-dom" provides a Component : `<RouterProvider/>` in which we need to pass the router object as props and render it.

  3.  Now suppose we need to maintain some skeleton among all routes (eg: header, footer) and based on route, only replace a specific component.

  - "react-router-dom" provides a Component : `<Outlet/>` with which, based on the route, the component in element property of a path object gets REPLACED with.

  - **NOTE:** `<Outlet/>` renders the element of the Child route i.e we need to set up childrens routes.

    - REASON: bcz then only we can specify that on route: '/' display skeleton && if nested routes: REPLACE `<Component/>` with the `<Outlet/>` in the `<Component/>`

    - HOW to define chlid routes?
      - in a path object: children property is used to define children/nested routes.
      - `children`: [{}, {}, ...] : takes array of path objects.

  - `<Outlet/>` doesn't take any space in DOM.

  4.  When some error occurs: "react-router-dom" also renders it' own error page.

  - we can create our own error page with dynamic error info.
    -> pathobject -> errorElement : `<myErrorComponent/>`

  - to get more details about the error: "react-router-dom" provides a HOOK in the `<Error/>`: `useRouteError`: call it && it will return an object containing details about the error.

## 3. Don't use (anchor) tag to go to a different URL.

- Reason: using anchor tag: page full reload.

- rather use `<Link to = "route">CLICK ON ME<Link/>` from "react-router-dom" to go to a different route.

  - then only page refreshed i.e component upload && NOT page reload.

  - Therefore, React Applications are called Single Page Applications(SPA) bcz there is only a single page and based on different routes, only components are getting updated(i.e modified, added, deleted, replaced).
