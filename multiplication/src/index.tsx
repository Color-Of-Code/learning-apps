import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './app';

const element = document.getElementById('root');
if (element != null) {
  const root = createRoot(element);
  root.render(<App />);
}
