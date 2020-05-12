import React from 'react';
import Typography from '@material-ui/core/Typography';

import { Divider } from '@material-ui/core';
import { useStyles } from '../styles';

export default function Header({ title }) {
    const classes = useStyles();

    return <React.Fragment>
        <Typography
            component="div"
            className={classes.heading}
            color="textPrimary"
        >{title}</Typography>
        <Divider />
    </React.Fragment>
}
