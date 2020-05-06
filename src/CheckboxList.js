import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import { InputBase } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function CheckboxList() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);
  const [list, setList] = React.useState([
      { id: 0, label: 'First item' }
  ]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const onInput = () => {};

  return (
    <List className={classes.root}>
      {list.map((value) => {
        const labelId = `checkbox-list-label-${value.id}`;

        return (
          <ListItem key={value.id} role={undefined} dense button>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(value.id) !== -1}
                tabIndex={-1}
                disableRipple
                onClick={handleToggle(value.id)}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <InputBase
                className={classes.margin}
                onInput={onInput}
                defaultValue={value.label}
                inputProps={{ 'aria-label': 'naked' }} />
          </ListItem>
        );
      })}
    </List>
  );
}
