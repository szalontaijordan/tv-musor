import React from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MoreIcon from '@material-ui/icons/MoreVert';
import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete';
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
                right: Math.min(100, deltaX)
            });

        setTransitions(newTransitions);
    }

    const onSwipe = (e, list) => {
        const { dir, deltaX, absX } = e;
        const t = transitions.find(x => x.id === list.id) || { right: 0 };

        let right = 0;

        if (dir === 'Left' && t.right < 100) {
            right = deltaX;
            setDeltaX(list, right);
        } else if (dir === 'Right') {
            right = Math.max(0, t.right + deltaX);
            setDeltaX(list, right);
        }
    };

    return <List>
        {(lists || []).map((list, index) => {
            const { title, list: items, date } = list;
            const right = (transitions.find(x => x.id === list.id) || {}).right;
            console.log(right);

            return <Swipeable onSwiping={e => onSwipe(e, list)} style={{ position: 'relative' }}>
                <ListItem style={{ right: `${right}px`, backgroundColor: 'white' }} className={classes.listItem} onClick={() => onClick(list)} button key={index} alignItems="flex-start">
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
                    <ListItemSecondaryAction style={{ right: `${right + 16}px` }}>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                        { /* <SimpleMenu items={['Törlés']} /> */}
                    </ListItemSecondaryAction>
                </ListItem>
                <div className={classes.under}>
                    <IconButton aria-label="delete" edge="end" className={classes.deleteUnder}>
                        <DeleteIcon style={{ color: '#eeeeee' }}  />
                    </IconButton>
                </div>
            </Swipeable>
        })}
    </List>;
}
