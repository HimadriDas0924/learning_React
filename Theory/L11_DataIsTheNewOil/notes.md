- React Application consists of 2 layers: data layer && UI layer.

- UI layer is all the JSX.
- Data layer is state variable, props i.e managing the data to be displayed on UI layer.

- NOTE: hooks can only be used inside functional components.

- access the value of input => `<input onChange = {(e) => console.log(e.target.value)} />`

1. HOC(higher order component)

   - is a js fn that takes a component and returns a new component.
   - i.e enhances the component.

2. How to build an **Accordion** ?

   - Accordion Component => Accordion Header part, Accordion Body part.

   - click on Accordion Header => triggers a cb fn => which `toggles the state of the Accordion Component` => based on `value of state` => `Accordion Body is shown/ kept hidden.`

3. What if I want to do: close all the other accordion components when I open up a new one.

   - Since from above: opening up an accordion depends on the state of the accordion i.e (within the Accordion Component -> click on Accordion Header -> toggle the display of Accordion Body using state variable value toggle of Accordion Component).

   - But, clicking on an Accordion Header, how can it affect the other Accordions. Every accordion has it's own state.

   - `SOLUTION to similar problem => lifting the state up.` i.e Rather than each accordion having a state, we make the parent have a state variable. And by passing props from parent -> child, we'll determine Accordion Body of which children to show.

   - Now, since we click on child header, the header need to tell the parent that this child's header was clicked on. So display the accordion body of this child only i.e State variable change and re-render. So based on state variable only determine which elem's body to show.

   - Now, how are each Accordion Comp unique to the parent -> either id/index of each elem.

   - But,`How can we change the state of Parent from the Child ?`

     - ANS: via `passing a cb fn from parent to child as props`. Inside the cb fn -> the definition to update the state variable of the parent. So whenever child wants to update state variable + parent re-render, it calls the cb fn.

   - Via above, auto closable accordion when we open a new one can be implemented BUT whenever we click on Child header, it call the cb fn which updates the state variable with child's index -> leading to re-render && leading to expanding the child's body, even if the child's body was already expanded. `So we cannot manually hide the child's body`.

   - To do it, pass the child's index to child and currentlyExpandedChildIndex to every child. On click if both of them matches: then we're trying to close the body -> set the parent's state to something such that no children's body is expanded. else we're trying to expand the current child's body so set the state variable to current child's index so that current child is only expanded.

4. Controlled v/s Uncontrolled Components:

   - `Controlled` -> when a Component relies on it's parent to decide for it. eg: Parent maintains a state variable and controls the Child by passing props to it. It's called controlled component.

   - `Uncontrolled` -> when a component takes it's own decision. eg: maintains a state and based on that decide when to re-render the component. It's called uncontrolled component.

5. Prop Drilling:

   - when a deeply nested child requires a prop from the very high level parent. Then since we cannot directly pass the prop from that parent to child, it has to go through all the intermediate parents. This is a problem called prop drilling.

   - It's not a good way to pass props from the parent to each parent like 10 levels deep.

   - **SOLUTION :** react context -> which is like a global object where we can keep the data and from there anybody can access it.

     - `usecase:` for example : user info -> if inside a lot of component's we're displaying the user info, then rather than passing it as props I'd rather store it in a context.

     - `Recommended:` create a context inside `/utils` rather than inside /components

6. All about context:

   - A global space where we can store things.
   - A context is not necessarily always an object.

   - create a context:

     - `const context = createContext({properties and values});`

   - use a context

     - `const data = useContext(contextName);`

   - why above we need to pass contextName ?

     - bcz we can create multiple context.

   - How to access data from a context inside a class based component ?

     - since we cannot use a hook i.e `useContext(contextName)`
     - ```javascript
       // 2 methods to access data from context inside either class/fn components.

       // method 1: use below method inside render() of class based components
       <ContextName.Consumer>
         {
           // (data) => console.log(data); // this data represent the data stored in context.
           // fn receives data from the context i.e object
           ({ loggedInUser }) => {
             return <div>{loggedInUser}</div>;
           }
         }
       </ContextName.Consumer>;

       // method 2: using hook
       const { loggedInUser } = useContext(UserContext);

       // use above data inside JSX
       ```

   - Overriding Context data for a part of the tree :

     - ```javascript
         // wrap <ContextName.Provider value = {smt.}> around the component(s) for which you need dynamic context data.

         <ContextName.Provider value = {key1: "a", key2: "b"}>
            // key1: "a", key2 : "b"
            <ComponentA />
            <ContextName.Provider value = {key1: "c", key2: "d"}>
              // key1: "c", key2: "d"
              <ComponentB />
            </ContextName.Provider>
         </ContextName.Provider>

       ```

   - So context is a global space where we can store things. we can update the context for some portion of our application. And we can also create multiple contexts.

7. Exercise: in an input box in body, whatever I type in, I want to dynamically change the value of context variable loggedInUser of the UserContext && make it reflect everywhere.

   - `to make it reflect everywhere:` UserContext.Provider wrapped around the entire app should take the new value and aur app should re-render i.e stateVariable of App/ should change && UserContext.Provider's value prop should take the changed values (could be value of state variable also).

   - Now, `from Body Comp, I need to trigger the re-render of App Component.` which can be done by triggering the cb fn passed from App to Body Component.

     - But this could've also been the case of prop drilling -> if Body Component was a very deeply nested child of App Component.

     - So maybe rather than passing the cb fn as props (from App -> Body), we can also store the cb fn in context.

8. Redux is a state management library which we need to get using npm install.

   - But when building a small scale application, we don't need redux, CONTEXT is powerful enough.

   - But when building a large scale application, (we can still use CONTEXT), but industrially REDUX is preferred.
