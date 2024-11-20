## HOW TO IMPLEMENT A DARK MODE ? (using tailwind)

1. `approach:`

   - how to do it ? -> add,remove the class of our root component to "dark".

   - toggle switch present in header -> child of root component.

   - Now, from the child, `how do i trigger the re-render of parent component ? `

     - `Approach:` pass a function from parent to child as props. whenever needed we call the fn in child -> which updates the state variable of parent leading of re-render of parent.

   - Now, If our root component re-renders we want to maintain the state that we've set earlier(AND not let it go back to it's default state).

     - `Solution:` we store some value for setting the theme in localStorage. So whenever our root re-renders, it 1st checks the value in localStorage and then set the theme accordingly.

2. FLOW :

   - app runs -> (check local storage && set up the theme) -> (render the components).

   - we toggle switch from the header -> (local storage update key value) -> (schedule re-render of parent component -> HOW ? -> passing doParentReRender fn from parent to child as props && in the function child need to pass the state value).

   - LocalStorage is for "maintaining the theme for re-renders".
