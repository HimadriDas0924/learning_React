1. Browser doesn't understand React && also VS code has to be configured to use React.

   - 1st way is to use 'react' in our code is via CDN i.e content delivery network (a website where react code is hosted && we're just using it from there)

   - Why 2 files

     - 1st is 'core react'
     - 2nd is 'react DOM' for DOM manipulation

     - NOW why not combine them into 1 file only ?
       - bcz 'react' not only run on browsers, it runs on mobile phones also i.e "react native".

2. Most expensive operation for browser is 'DOM manipulation'.

3. props: {children + attribute}

4. React is a LIBRARY bcz it can independently work in a small portion of your app (unlike frameworks).

- i.e whichever part you'll set the `root` as.

5. Order of `<script>` files matter, bcz 1st get the react code then only we can use the react code in our `<script>` file.
