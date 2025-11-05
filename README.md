# Understanding `useState` in React

## 1. What is `useState`?
- `useState` is a React hook that lets you create and manage a variable that can change while the app is running.
- This variable is part of the component’s state.
- When you change the state, React re-renders the component to show the updated information.

Key idea:  
Without `useState`, a functional component cannot have data that changes and automatically updates the UI.

---

## 2. How it works
`useState` returns two things:

1. The current state value (a variable).
2. A function to update that value.

Syntax:
```jsx
const [state, setState] = useState(initialValue);

state → holds the current value.
setState → function that updates the value and triggers a re-render.
initialValue → the starting value of the state.
```
---

## Important Rules:
- Never update state directly (❌ state = 5), always use setState.
- Updating state causes a re-render, but React optimizes it.
- You can store numbers, strings, objects, arrays, and more in useState.
- If the new value depends on the old value, use a callback function:

```jsx
setCount(prev => prev + 1);
```
---

# Handling Forms in React

## 1. What is Form Handling?
In React, form handling means managing the values that a user types into input fields, textareas, selects, etc., and deciding what to do with those values (e.g., save them, validate them, send them to a server).

---

## 2. Controlled Components
React uses the concept of **controlled components** for handling forms.
- The value of the form field is controlled by React state.
- Any change in the input updates the state, and the state determines what is displayed in the input.

Example:
```jsx
import { useState } from "react";

export default function FormExample() {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitted name: ${name}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```
- value={name} makes the input controlled by the name state.
- onChange updates the state whenever the user types.
- On submit, we prevent the default behavior and use the state value.

```jsx
User types in input
       |
       v
 onChange event triggered
       |
       v
Update state with new value
       |
       v
React re-renders component
       |
       v
Input shows updated state value
```
---

# Rendering Lists

## 1. What is Conditional Rendering?
Conditional rendering means showing different UI elements depending on some condition.
In React, this is done using JavaScript conditions inside JSX.

Lists are rendered using JavaScript's map() function.
Syntax:
```jsx
const items = ["Apple", "Banana", "Cherry"];

export default function FruitsList() {
  return (
    <ul>
      {items.map((fruit, index) => (
        <li key={index}>{fruit}</li>
      ))}
    </ul>
  );
}
```
---

We can conditionally render list items based on logic.
Syntax:
```jsx
const items = ["Apple", "Banana", "Cherry"];

export default function FruitsList() {
  return (
    <ul>
      {items.map((fruit, index) =>
        fruit.startsWith("B") ? (
          <li key={index}>{fruit}</li>
        ) : null
      )}
    </ul>
  );
}
```

Common Conditional Rendering Patterns: 
- isLoggedIn && <p>Welcome back!</p>
- isLoggedIn ? <p>Welcome</p> : <p>Please log in</p>
- if (!items.length) {
  return <p>No items found</p>;
}
return <ul>{items.map(...)} </ul>;

