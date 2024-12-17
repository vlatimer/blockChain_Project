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
// See my balance
// See transactions
// ------------------
// Account
// Auth error on styles
