# ReacUI

A modern React UI library with customizable components, built with Tailwind CSS and React 18.

## Features

- 30 customizable React components
- Light and dark mode support
- Responsive design
- Tailwind CSS styling
- Lightweight bundle size
- Comprehensive documentation

## Installation

```bash
npm install reacui
# or
yarn add reacui
```

## Usage

```jsx
import React from 'react';
import { ThemeProvider, Button } from 'reacui';
import 'reacui/dist/style.css'; // Import styles

function App() {
  return (
    <ThemeProvider>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">ReacUI Demo</h1>
        
        <div className="space-x-2">
          <Button>Default Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
        
        <div className="mt-4 space-x-2">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
        
        <div className="mt-4">
          <Button disabled>Disabled</Button>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
```

## Available Components

- Accordion: Collapsible content panels
- Alert: Contextual feedback messages
- Avatar: User profile pictures or initials
- Badge: Small count and labeling component
- Button: Standard button with variants, sizes, and states
- Card: Container for related content and actions
- Checkbox: Selectable input control
- DateTimePicker: Date and time selection component
- FileInput: File upload component
- Grid: Responsive layout grid system
- Input: Text input field
- Modal: Dialog windows for focused interactions
- Popover: Small overlay for contextual information
- Radio: Single-selection input control
- RangeSlider: Range selection slider
- Select: Dropdown selection component
- Slider: Value selection slider
- Spinner: Loading indicator
- Switch: Toggle control
- Table: Data table component
- Textarea: Multi-line text input
- Toast: Brief notifications
- Tooltip: Informational text when hovering over elements

## Theme Support

ReacUI supports both light and dark modes through the `ThemeProvider` component:

```jsx
import { ThemeProvider } from 'reacui';

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

You can toggle between themes with:

```jsx
import { useTheme } from 'reacui';

function ThemeToggle() {
  const { toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Toggle Theme
    </button>
  );
}
```

## Development

To work on this library:

1. Clone the repository
2. Install dependencies: `npm install`
3. Build the library: `npm run build`
4. Run tests: `npm test`

## License

MIT 