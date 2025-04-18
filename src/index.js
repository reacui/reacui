// Import CSS
import './styles/index.css';

// Import components for default export
import { ThemeProvider } from './utils/ThemeProvider';
import { Button } from './components/Button';
import { Input } from './components/Input';
import { Checkbox } from './components/Checkbox';
import { Card } from './components/Card';

// Export ThemeProvider
export { ThemeProvider, useTheme } from './utils/ThemeProvider';

// Export components
export { Button } from './components/Button';
export { Input } from './components/Input';
export { Checkbox } from './components/Checkbox';
export { Card } from './components/Card';
// Example: export { Modal } from './components/Modal';
// ... additional components will be added here

// Default export
export default {
  ThemeProvider,
  Button,
  Input,
  Checkbox,
  Card,
  // Additional components will be added here
}; 