/* eslint-disable react/jsx-filename-extension */
import 'bootstrap/dist/css/bootstrap.min.css';
import './bootstrap';
import React from 'react';
import { debugContextDevtool } from 'react-context-devtool';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import UserContextProvider from './Contexts/UserContext';
import App from './App';

const container = document.getElementById('app');

render(
    <UserContextProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </UserContextProvider>,
    container,
);

debugContextDevtool(container);
