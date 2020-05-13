import React from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MoreIcon from '@material-ui/icons/MoreVert';
import ShareIcon from '@material-ui/icons/Share';
import { Swipeable } from 'react-swipeable'

import { ListItemSecondaryAction } from '@material-ui/core';

import { useStyles } from '../styles';
import { useHistory } from 'react-router-dom';

export default function ShoppingLists({ lists, destination = 'create' }) {
    const classes = useStyles();
    const history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const [transitions, setTransitions] = React.useState([]);

    const onClick = ({ id }) => history.push(`/${destination}/${id}`);

    const setDeltaX = (list, deltaX) => {
        const newTransitions = transitions
            .filter(x => x.id !== list.id)
            .concat({
                id: list.id,
                transform: `translateX(-${deltaX}px)`
            });

        setTransitions(newTransitions);
    }

    const onSwipeLeft = (e, list) => {
        const { dir, deltaX, absX } = e;
        const t = transitions.find(x => x.id === list.id);

        if (t && t.transform.includes('100')) {
            return;
        }

        if (dir === 'Left') {
            setDeltaX(list, deltaX);
        }
    };

    const onSwiped = (e, list) => {
        const { deltaX } = e;
        if (deltaX <= 100) {
            setDeltaX(list, 0);
        } else {
            setDeltaX(list, 100);
        }
    };

    return <List>
        {(lists || []).map((list, index) => {
            const { title, list: items, date } = list;
            const style = (transitions.find(x => x.id === list.id) || {}).transform || {};

            return <Swipeable onSwiping={e => onSwipeLeft(e, list)} onSwiped={e => onSwiped(e, list)}>
                <ListItem style={{ transform: style }} onClick={() => onClick(list)} button key={index} alignItems="flex-start">
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
                    <ListItemSecondaryAction style={{ transform: style + ' translateY(-50%)' }}>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                        { /* <SimpleMenu items={['Törlés']} /> */}
                    </ListItemSecondaryAction>
                </ListItem>
            </Swipeable>
        })}
    </List>;
}
