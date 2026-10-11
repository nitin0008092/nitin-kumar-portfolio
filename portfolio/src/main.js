import './styles/main.css';
import './styles/components.css';
import { handleRoute } from './router.js';

// Initialize application routing
window.addEventListener('DOMContentLoaded', handleRoute);
window.addEventListener('hashchange', handleRoute);
