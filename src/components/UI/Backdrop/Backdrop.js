import React from 'react';
import classes from './Backdrop.css'

const backdrop = (props) => (
    props.shadow ?
    <div className={classes.Backdrop} onClick={props.clicked}></div> : null
)

export default backdrop;