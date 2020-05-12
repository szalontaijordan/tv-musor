import React from 'react';
import { IconButton, Divider } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom';
import { useStyles } from '../styles';

export default function Back() {
    const classes = useStyles();
    const history = useHistory();

    return <React.Fragment>
        <IconButton onClick={() => history.goBack()} className={classes.back}>
            <ArrowBackIcon />
        </IconButton>
        <Divider />
    </React.Fragment>;
}