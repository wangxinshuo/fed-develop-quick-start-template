import React from 'react';
import ReactDOM from 'react-dom';

import './index.css'

ReactDOM.render(
    <div style={{textAlign: 'center'}}>
        <h1>Hello Google</h1>
        <img src={require('../img/baidu.png')} alt=""/>
        <img src={require('../img/google.png')} alt=""/>
        <p>999</p>
    </div>,
    document.getElementById('root')
)