import 'bootstrap/dist/css/bootstrap.min.css';
import classNames from 'classnames';
import React from 'react';
import '../css/App.css';
import RouteList from './Components/RouteList';

export default function App() {
    return (
        <div className={classNames('App wrapper min-vh-100')}>
            <RouteList />
        </div>
    );
}
