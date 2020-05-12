import React from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MoreIcon from '@material-ui/icons/MoreVert';
import ShareIcon from '@material-ui/icons/Share';

import { ListItemSecondaryAction } from '@material-ui/core';

import { useStyles } from '../styles';
import SimpleMenu from './SimpleMenu';

export default function ShoppingLists({ lists }) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    return <List>
        {(lists || []).map((list, index) => {
            const { title, list: items, date } = list;

            return <ListItem button key={index} alignItems="flex-start">
                <ListItemText
                    primary={title}
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >{date ? new Date(date).toLocaleString('hu-HU') + ' - ' : '- '}</Typography>
                            {(items || []).map(item => item.label).join(', ')}
                        </React.Fragment>
                    }
                />
                <ListItemSecondaryAction>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <SimpleMenu items={['Törlés']} />
                </ListItemSecondaryAction>
            </ListItem>
        })}
    </List>;
}