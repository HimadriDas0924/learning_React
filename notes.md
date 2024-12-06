## NOTE:

- to crop image from center and make it of specific dimensions
  - parent => overflow-hidden dimensions
  - child => object-center object-cover inherit parent's dimensions

## 1. Redux:

    - Redux is not mandatory in an application.

    - React and Redux are different libraries.

    - Redux is a state management library.

    - Redux offers easy debugging.

    - redux-toolkit => newer way of writing redux.

        - why use it ?

            - bcz without it earlier: configuring a redux store was too much complicated, had to add a lot of packages to made redux useful, required a lot of boilerplate code.

## 2. NOTES:

    - wrap the Provider of react-redux to a specific portion of the app i.e in whichever part you want to have access to redux store.

    - subscribing to the store using a selector => via useSelector() hook
