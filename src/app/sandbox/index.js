import React from 'react';
import { render } from 'react-dom';
import Sandbox from './Sandbox';

const root = document.createElement('div');
document.body.appendChild(root);

render(<Sandbox />, root);
