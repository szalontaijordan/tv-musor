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
import { useHistory } from 'react-router-dom';

export default function ShoppingLists({ lists, destination = 'create' }) {
    const classes = useStyles();
    const history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const onClick = ({ id }) => history.push(`/${destination}/${id}`);

    return <List>
        {(lists || []).map((list, index) => {
            const { title, list: items, date } = list;

            return <ListItem onClick={() => onClick(list)} button key={index} alignItems="flex-start">
                <ListItemText
                    primary={title}
                    style={{ maxWidth: '50vw' }}
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >{date ? new Date(date).toLocaleString('hu-HU') + ' - ' : '- '}</Typography>
                            {(items || []).slice(0, 4).map(item => item.label).join(', ') + ' ...'}
                        </React.Fragment>
                    }
                />
                <ListItemSecondaryAction>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    { /* <SimpleMenu items={['Törlés']} /> */}
                </ListItemSecondaryAction>
            </ListItem>
        })}
    </List>;
}
