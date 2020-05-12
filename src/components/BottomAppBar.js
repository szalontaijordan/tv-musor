import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import Zoom from '@material-ui/core/Zoom';
import { useLocation } from 'react-router-dom';

import './App.css';
import { ThemeProvider } from '@material-ui/core';
import { customTheme } from '../customTheme';

import { Link } from 'react-router-dom';
import { useStyles } from '../styles';

export default function BottomAppBar({ selected, navigation, ...props }) {
    const classes = useStyles();
    const location = useLocation();

    return (
        <ThemeProvider theme={customTheme}>
            <CssBaseline />
            <Paper square className={classes.paper}>
                {props.children}
            </Paper>
            {selected
                && <AppBar position="fixed" color="primary" className={classes.appBar}>
                    <Toolbar>
                        <IconButton onClick={() => props.setIsDrawerOpen(true)} edge="start" color="inherit" aria-label="open drawer">
                            <MenuIcon className={classes.white} />
                        </IconButton>
                        {selected.fabIcon
                            && <Zoom in={!!selected}>
                                <Link to={`${selected.id}/new`} className={classes.fabButton}>
                                    <Fab color="secondary" aria-label="add">
                                        {selected.fabIcon}
                                    </Fab>
                                </Link>
                            </Zoom>}
                        <div className={classes.grow} />
                        <IconButton className={classes.white} edge="end" color="inherit">
                            <MoreIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>}
            {navigation}
        </ThemeProvider>
    );
}
