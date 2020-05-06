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
import DoneAllIcon from '@material-ui/icons/DoneAll';
import { InputBase } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  fullWidth: {
    width: 'calc(100vw - 88px)'
  },
  marginTop: {
    marginTop: '25px'
  }
}));

let id = 1;

export default function CheckboxList({ onComplete, initialList }) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [forceFocus, setForceFocus] = React.useState(-1);
  const [isLookingComplete, setIsLookingComplete] = React.useState(false);

  const [list, setList] = React.useState(initialList || [{ id: 0, label: '' }]);

  React.useEffect(() => {
    const shouldFocus = document.querySelector(`#checkbox-list-label-${forceFocus}`);

    if (forceFocus >= 0 && shouldFocus) {
      shouldFocus.focus();
      setForceFocus(-1);
    }
  }, [forceFocus]);

  React.useEffect(() => {
    const complete = list.some(x => x.label.length > 0);
    onComplete({ isComplete: complete, list });

    setIsLookingComplete(complete);
  }, [list]);

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

  const onKeyDown = (e, value) => {
    if (e.key === 'Enter') {
      const indexOfItem = list.findIndex(x => x.id === value.id);
      const newList = [...list];
      const newItem = {
        id: id++,
        label: ''
      };

      newList.splice(indexOfItem + 1, 0, newItem);
      setList(newList);
      setForceFocus(newItem.id);
    } else if (e.key === 'Backspace' && e.target.value === '') {
      const deletedItemIndex = list.findIndex(x => x.id === value.id);
      const prevItem = list[deletedItemIndex - 1];
      const newList = list.filter(x => x.id !== value.id);

      if (newList.length !== 0) {
        setList(newList);
        setForceFocus(prevItem ? prevItem.id : -1);
      }
    } else if (e.key === 'ArrowUp') {
      const itemIndex = list.findIndex(x => x.id === value.id);
      const item = list[itemIndex - 1];
      setForceFocus(item ? item.id : -1);
    } else if (e.key === 'ArrowDown') {
      const itemIndex = list.findIndex(x => x.id === value.id);
      const item = list[itemIndex + 1];
      setForceFocus(item ? item.id : -1);
    }
  };

  const onChange = (e, value) => {
    const newList = list.map(x => {
      if (x.id === value.id) {
        return {
          ...x,
          label: e.target.value
        };
      }
      return x;
    })
    setList(newList);
  }

  return (
    <List className={classes.root}>
      {list.map((value, index) => {
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
                id={labelId}
                autoComplete="off"
                className={classes.fullWidth}
                onKeyDown={e => onKeyDown(e, value)}
                onChange={e => onChange(e, value)}
                defaultValue={value.label}
                placeholder={index === 0 ? 'Venni kell ...' : 'meg ööö ...'}
                inputProps={{ 'aria-label': 'naked' }} />
          </ListItem>
        );
      })}
      { isLookingComplete
        && <ListItem role={undefined} dense button className={classes.marginTop}>
        <ListItemIcon>
            <DoneAllIcon />
            </ListItemIcon>
            <ListItemText primary="Ennyu" />
        </ListItem> }
    </List>
  );
}
