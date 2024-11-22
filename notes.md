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

   - Via above, auto closable accordion when we open a new one can be implemented BUT whenever we click on Child header, it call the cb fn which updates the state variable with child's index -> leading to re-render && leading to expanding the child's body, even if the child's body was already expanded. `So we cannot manually hide the child's body`. <- **yet to be implemented**.

4. Controlled v/s Uncontrolled Components:

   - `Controlled` -> when a Component relies on it's parent to decide for it. eg: Parent maintains a state variable and controls the Child by passing props to it. It's called controlled component.

   - `Uncontrolled` -> when a component takes it's own decision. eg: maintains a state and based on that decide when to re-render the component. It's called uncontrolled component.
