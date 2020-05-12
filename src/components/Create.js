import React from 'react';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { useStyles } from '../styles';
import { listService } from '../services/services';
import Header from './Header';
import ShoppingLists from './ShoppingList';

import image from '../assets/create.svg';

export default function Create() {
    const classes = useStyles();
    const [lists, setLists] = React.useState(undefined);
    const [remove, setRemove] = React.useState(undefined);

    React.useEffect(() => {
        listService.fetchLists().then(lists => setLists(lists));
    }, []);

    if (Array.isArray(lists) && lists.length === 0) {
        return <React.Fragment>
            <Header title="Lista írás" />
            <img src={image} className={classes.imageCenter} />
        </React.Fragment>;
    }

    return <React.Fragment>
        <Backdrop className={classes.backdrop} open={!Array.isArray(lists)}><CircularProgress color="inherit" /></Backdrop>
        <Header title="Lista írás" />
        <ShoppingLists lists={lists} />
    </React.Fragment>;
}
