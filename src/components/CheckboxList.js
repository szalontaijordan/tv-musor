import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import ShareIcon from '@material-ui/icons/Share';
import { InputBase, Slide, Fab, Zoom, Backdrop, CircularProgress } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { listService } from '../services/services';
import Back from './Back';
import { createNewId } from '../services/id';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  fab: {
    color: 'white',
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  fullWidth: {
    width: 'calc(100vw - 88px)'
  },
  marginTop: {
    marginTop: '25px'
  },
  listTitle: {
    padding: '16px',
    fontWeight: '700',
    width: '100vw'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  meta: {
    textAlign: 'left',
    padding: theme.spacing(2),
    color: '#e0e0e0'
  }
}));

let ID = 1;

const defaultSource = {
  id: 'new',
  list: [{ id: 0, label: '' }],
  date: new Date(),
  title: ''
};

export default function CheckboxList({ immutable, source = defaultSource, ...props }) {
  const { id, date } = source;

  const { id: listId } = useParams();
  const classes = useStyles();
  const history = useHistory();
  const [checked, setChecked] = React.useState([]);
  const [forceFocus, setForceFocus] = React.useState(-1);
  const [isLookingComplete, setIsLookingComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [initialLoad, setInitialLoad] = React.useState(false);

  const [shoppingList, setShoppingList] = React.useState(source);

  const placeholder = `Bevásárlás - ${new Date().toLocaleString('hu-HU', { year: 'numeric', month: 'long', day: 'numeric' })}`;

  React.useEffect(() => {
    console.log('[CheckboxList] mount');
    setInitialLoad(true);

    if (listId && listId !== 'new') {      
      listService.fetchList(listId)
        .then(shoppingList => {
          setShoppingList(shoppingList);
          setInitialLoad(false);
        })
        .catch(err => {
          setInitialLoad(false);
          history.replace('/');
        });
    } else if (listId === 'new') {
      const newList = {
        ...shoppingList,
        title: shoppingList.title || placeholder,
        id: createNewId(),
        date: new Date().toJSON()
      };

      listService.createList(newList).then(list => {
        setShoppingList(list);
        setInitialLoad(false);
        history.replace('/create/' + list.id)
      });
    }
  }, []);

  React.useEffect(() => {
    const shouldFocus = document.querySelector(`#checkbox-list-label-${forceFocus}`);

    if (forceFocus >= 0 && shouldFocus) {
      shouldFocus.focus();
      setForceFocus(-1);
    }
  }, [forceFocus]);

  React.useEffect(() => {
    const complete = shoppingList.list.some(x => x.label.length > 0);
    setIsLookingComplete(complete);
  }, [shoppingList]);

  React.useEffect(() => {
    if (isLoading) {
      const listEntity = shoppingList;

      listService.createList(listEntity).then(() => {
        setIsLoading(false);
        history.push('/');
      });
    }
  }, [isLoading]);

  const completeList = () => setIsLoading(true);

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
    const { list } = shoppingList;

    if (e.key === 'Enter') {
      const indexOfItem = list.findIndex(x => x.id === value.id);
      const newList = [...list];
      const newItem = {
        id: ID++,
        label: ''
      };

      newList.splice(indexOfItem + 1, 0, newItem);
      setShoppingList({ ...shoppingList, list: newList });
      setForceFocus(newItem.id);
    } else if (e.key === 'Backspace' && e.target.value === '') {
      const deletedItemIndex = list.findIndex(x => x.id === value.id);
      const prevItem = list[deletedItemIndex - 1];
      const newList = list.filter(x => x.id !== value.id);

      if (newList.length !== 0) {
        setShoppingList({ ...shoppingList, list: newList });
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
    const newList = shoppingList.list.map(x => {
      if (x.id === value.id) {
        return {
          ...x,
          label: e.target.value
        };
      }
      return x;
    })
    setShoppingList({ ...shoppingList, list: newList });
  }

  const onTitleChange = e => setShoppingList({ ...shoppingList, title: e.target.value });

  return <Slide direction={props.direction || 'up'} in mountOnEnter unmountOnExit>
    <div style={{ height: '100vh' }}>
      <Back />
      <InputBase
        className={classes.listTitle}
        placeholder={placeholder}
        value={shoppingList.title}
        style={{ pointerEvents: immutable ? 'none' : 'inherit' }}
        onChange={onTitleChange}
      ></InputBase>
      <List className={classes.root}>
        {shoppingList.list.map((value, index) => {
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
                  value={value.label}
                  placeholder={index === 0 ? 'Venni kell ...' : 'meg ööö ...'}
                  inputProps={{ 'aria-label': 'naked' }} />
            </ListItem>
          );
        })}
        { isLookingComplete
          && <ListItem role={undefined} dense button className={classes.marginTop}>
              <ListItemIcon><DoneAllIcon color={checked.length === shoppingList.length ? 'secondary' : 'inherit' } /></ListItemIcon>
              <ListItemText primary="Ennyu" />
          </ListItem> }
          <div className={classes.meta}>
            <div>{ listId || '' }</div>
            <div>{ date ? new Date(date).toLocaleString('hu-HU') : '' }</div>
          </div>    
      </List>
      <Zoom in={!immutable && isLookingComplete}>
        <Fab onClick={completeList} color="secondary" aria-label="share" className={classes.fab}>
          <ShareIcon />
        </Fab>
      </Zoom>
      <Backdrop className={classes.backdrop} open={isLoading || initialLoad}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  </Slide>;
}
