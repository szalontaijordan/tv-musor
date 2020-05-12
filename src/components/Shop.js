import React from 'react';
import Header from './Header';
import ShoppingLists from './ShoppingList';

export default function Shop() {
    return <React.Fragment>
        <Header title="Bevásárlás" />
        <ShoppingLists lists={[]} />
    </React.Fragment>;
}
