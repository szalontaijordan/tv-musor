import React from 'react';
import Header from './Header';
import ShoppingLists from './ShoppingList';
import { listService } from '../services/services';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { useStyles } from '../styles';

import image from '../assets/shop.svg';

export default function Shop() {
    const classes = useStyles();
    const [lists, setLists] = React.useState(undefined);
    const [remove, setRemove] = React.useState(undefined);

    React.useEffect(() => {
        listService.fetchActiveShoppings().then(lists => setLists(lists));
    }, []);

    if (Array.isArray(lists) && lists.length === 0) {
        return <React.Fragment>
            <Header title="Bevásárlás" />
            <img src={image} className={classes.imageCenter} />
        </React.Fragment>;
    }

    return <React.Fragment>
        <Backdrop className={classes.backdrop} open={!Array.isArray(lists)}><CircularProgress color="inherit" /></Backdrop>
        <Header title="Bevásárlás" />
        <ShoppingLists lists={lists} destination="shop/do" />
    </React.Fragment>;
}
