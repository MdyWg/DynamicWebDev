// 1. Arrow Function
// these two do the same thing
// function double(n) {
//   return n * 2
// }

// const double = (n) => n * 2

// rewrite: 
// function shout(word) {
//   return word.toUpperCase() + '!'
// }
const short = (word) => word.toUpperCase() + '!'

// 2. Destructuring
// Pulling values out of an object into their own variables.
// const recipe = {title: 'Pancakes', servings: 4}

// // the long way
// const title = recipe.title

// // destructuring
// const {title, servings} = recipe

// Try it: given const user = {name: 'Ada', role: 'admin'}, pull name and role out in one line.
const {name, role} = user

// 3. Template Literals
// Backticks, not quotes. ${} drops a value in.
// const name = 'Ada'
// const greeting = `Hello, ${name}! You have ${2 + 3} messages.`

// Try it: build the string "Pancakes serves 4" out of the recipe object above from 2.
const literal = `${recipe.title} serves ${recipe.servings}`

// 4. .map()
// Takes an array, runs a function on every item, gives you back a new array of the results. The original is untouched. This is how every list in React gets rendered.
// const nums = [1, 2, 3]
// const doubled = nums.map((n) => n * 2) // [2, 4, 6]

const ingredients = ['butter', 'milk', 'egg']
// // make: ['BUTTER', 'MILK', 'EGG']
const upper = ingredients.map((ingredient) => ingredient.toUpperCase())

// Then try: turn ['butter', 'milk'] into ['<li>butter</li>', '<li>milk</li>']. Sit with that one for a second — that is almost exactly what React does.
const li = ingredients.slice(0, 2).map((ingredient) => `<li>${ingredient}</li>`)

// 5. Spread ...
// Copies the contents of an array or object into a new one.
// const a = [1, 2]
// const b = [...a, 3] // [1, 2, 3]

// const base = {color: 'red'}
// const shirt = {...base, size: 'M'} // {color: 'red', size: 'M'}

// Try it: make an array of five empty slots with [...Array(5)]. What do you get? Why might that be useful for drawing five stars?
const arr = [...Array(5)]

// 6. Ternary and &&
// Two ways to choose a value in one line.
// // ternary:  condition ? ifTrue : ifFalse
// const label = isOpen ? 'Close' : 'Open'

// // &&  gives back the last value if everything before it is truthy,
// //     otherwise the first falsy one
// const maybe = isLoggedIn && 'Welcome back'

// Try it: given const count = 0, what does count > 0 && 'has items' evaluate to? What about when count = 3?
// False and 'has items'
// React renders nothing at all for false, null and undefined — which is exactly why && is the standard way to show or hide something.




