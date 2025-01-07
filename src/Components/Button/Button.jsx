import React, { Fragment } from 'react';

import { Button } from '@mui/material';

const Buttons = ({text, handleClick}) => {
  return (
    <Fragment>
        <Button onClick={handleClick} variant='contained' >{text}</Button>
    </Fragment>
  )
}

export default Buttons