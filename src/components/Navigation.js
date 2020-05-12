import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useLocation } from 'react-router-dom';

import { SwipeableDrawer, Divider } from '@material-ui/core';

import { NavLink } from 'react-router-dom';
import { useStyles } from '../styles';

export default function Navigation({ actions, identity, isDrawerOpen, ...props }) {
    const classes = useStyles();
    const location = useLocation();

    React.useEffect(() => {
        let selected = actions.find(a => a.id === location.pathname);

        if (!selected && location.pathname === identity.id) {
            selected = identity;
        }

        console.log('SELECTED ACTION', selected)
        props.setSelected(selected);
    }, [location]);

    return <SwipeableDrawer
        anchor="bottom"
        open={isDrawerOpen}
        onClose={() => props.setIsDrawerOpen(false)}
        onOpen={() => props.setIsDrawerOpen(true)}
    >
        <div className={classes.fullList} onClick={() => props.setIsDrawerOpen(false)}>
            <List className={classes.block}>
                {actions.map((action, index) => (
                    <NavLink key={index} to={action.id} className={classes.resetLink} >
                        <ListItem key={action.id}>
                            <ListItemIcon>{action.menuIcon}</ListItemIcon>
                            <ListItemText primary={action.label} />
                        </ListItem>
                    </NavLink>
                ))}
            </List>
            <Divider />
            <List className={classes.block}>
                <NavLink to={identity.id} className={classes.resetLink} >
                    <ListItem button key="1">
                        <ListItemIcon>{identity.menuIcon}</ListItemIcon>
                        <ListItemText primary={identity.label} />
                    </ListItem>
                </NavLink>
            </List>
        </div>
    </SwipeableDrawer>;
}
