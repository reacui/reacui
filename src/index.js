// Import CSS
import './styles/index.css';

// Import components for default export
import { ThemeProvider } from './utils/ThemeProvider';
import { Button } from './components/Button';
import { Input } from './components/Input';
import { Checkbox } from './components/Checkbox';
import { Card } from './components/Card';
import { Radio } from './components/Radio';
import Select from './components/Select';
import Textarea from './components/Textarea';
import RangeSlider from './components/RangeSlider';
import { Switch } from './components/Switch';
import { Slider } from './components/Slider';
import { FileInput } from './components/FileInput';

// Export ThemeProvider
export { ThemeProvider, useTheme } from './utils/ThemeProvider';

// Export components
export { Button } from './components/Button';
export { Input } from './components/Input';
export { Checkbox } from './components/Checkbox';
export { Card } from './components/Card';
export { Radio } from './components/Radio';
export { default as Select } from './components/Select';
export { default as Textarea } from './components/Textarea';
export { default as RangeSlider } from './components/RangeSlider';
export { Switch } from './components/Switch';
export { Slider } from './components/Slider';
export { FileInput } from './components/FileInput';
// Example: export { Modal } from './components/Modal';
// ... additional components will be added here

// Default export
export default {
  ThemeProvider,
  Button,
  Input,
  Checkbox,
  Card,
  Radio,
  Select,
  Textarea,
  RangeSlider,
  Switch,
  Slider,
  FileInput,
  // Additional components will be added here
}; 