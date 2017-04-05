import React from 'react';
import './loader.css';
import Spinner from './spinner.svg';


export default function Loader() {
        return <div className="loader">
            <img src={Spinner} alt="loading..."/>
        </div>
}