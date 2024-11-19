- `flex`
- `w-24` => width of 6 rem, `h-8` => height of 2 rem
- `p` => padding, `m` => margin
- `px` => padding left, right.
- `rounded` => border-radius
- `border border-black border-solid` => border
- `bg-green` => background color, `text-green` => color
- dynamic classes (if a class with a specific value doesn't exist, we can dynamically provide it) => `m-[200px]` => margin of 200px.
- `font-bold` => make text bold.
- `text-xl` => make text xl

## About Tailwind:

- `Advantage`:

  - whichever classes we're using in our project, those classes will only be included in the bundle and NOT all the classes that the framework hold.

  - don't have to traverse among different files.

  - when multiple people are working in production. Suppose you've created a class that does something to a component. Other person cannot like search the entire CSS so most probably he'll create a new class that does the same thing. Code for both the classes will be present in the bundle i.e redundant classes. which won't happen if we're using tailwind.

- `Disadvantage`:
  - css code can go long. So our JS code becomes messy.
