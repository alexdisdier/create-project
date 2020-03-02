# Button

<!-- STORY -->

<hr>

A component for handling user input. It is commonly used within a form.

##### Import

```js
import { Button } from "your-library-name";
```

##### Usage

```jsx
<Button onClick={() => "Do something"}>I am a button</Button>
```

##### Required props

| Name       | Type   | Description                 |
| ---------- | ------ | --------------------------- |
| `children` | `node` | e.g: Add a label or an icon |

##### Optional props

| Name       | Type       | Default    | Description               |
| ---------- | ---------- | ---------- | ------------------------- |
| `onClick`  | `function` | `() => {}` |                           |
| `disabled` | `boolean`  | `false`    |                           |
| `type`     | `string`   | `button`   |                           |
| `color`    | `string`   | `button`   | `Either an Hex or a name` |
