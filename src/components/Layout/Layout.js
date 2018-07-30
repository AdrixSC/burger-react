import React from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.css'

const layout = (props) => (
  <Aux>
    <div>Toolbar, slidebar, Backdrop</div>
    <main className={classes.Container}>
      {props.children}
    </main>
  </Aux>
);


export default layout;