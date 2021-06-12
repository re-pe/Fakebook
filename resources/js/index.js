/* eslint-disable react/jsx-filename-extension */
import 'bootstrap/dist/css/bootstrap.min.css';
import './bootstrap';
import React from 'react';
import { debugContextDevtool } from 'react-context-devtool';
import { render } from 'react-dom';
import App from './App';

const container = document.getElementById('app');

render(
    <App />,
    container,
);

debugContextDevtool(container);
