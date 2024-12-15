import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './app/app.jsx';

const root = document.getElementById("root")
const reactRoot = createRoot(root);

reactRoot.render(
  <App/>
)

//PLAN:
// Accept order
// Submit order
// See my balance
// ------------------
// Account
// Auth error on styles
