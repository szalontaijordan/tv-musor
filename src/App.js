import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import CreateIcon from '@material-ui/icons/Create';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ShareIcon from '@material-ui/icons/Share';
import { useHistory, useLocation } from 'react-router-dom';

import './App.css';
import { SwipeableDrawer, Divider, ThemeProvider } from '@material-ui/core';
import { customTheme } from './customTheme';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  NavLink
} from 'react-router-dom';
import { useStyles } from './styles';
import CheckboxList from './CheckboxList';

export default function App() {
  const [shoppingList, setShoppingList] = React.useState({});
  const onComplete = (x) => setShoppingList(x);

  const router = <Switch>
    <Route path="/" exact strict><Redirect to={{ pathname: 'shop' }} /></Route>
    <Route path="/shop" exact strict><Shop /></Route>
    <Route path="/create" exact strict><Create onComplete={onComplete} /></Route>
    <Route path="/create/new" exact strict><CheckboxList onComplete={onComplete} /></Route>
    <Route path="/identity" exact strict><Identity /></Route>
  </Switch>;

  return <Router><BottomAppBar children={router} shoppingList={shoppingList} /></Router>;
}

export function Shop({ onComplete }) {
  return 'Shop';
}

export function Create({ onComplete }) {
  return 'Create';
}

export function Identity() {
  return 'Identity';
}

export function BottomAppBar({ shoppingList: { isComplete, list }, ...props }) {
  const classes = useStyles();
  const location = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  
  const actions = [
    { label: 'Lista írás', id: '/create', menuIcon: <CreateIcon />, fabIcon: <CreateIcon to="/create/new" className={classes.white} /> },
    { label: 'Bevásárlás', id: '/shop', menuIcon: <ShoppingBasketIcon />, fabIcon: <ShoppingBasketIcon className={classes.white} /> }
  ];
  const identity = { label: 'Azonosító', id: 'identity', menuIcon: <PermIdentityIcon />, fabIcon: <PermIdentityIcon className={classes.white} /> };

  const [selected, setSelected] = React.useState(actions[0]);

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Paper square className={classes.paper}>
        {props.children}
      </Paper>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <IconButton onClick={() => setIsDrawerOpen(true)} edge="start" color="inherit" aria-label="open drawer">
            <MenuIcon className={classes.white} />
          </IconButton>
          { selected.id !== identity.id && <Fab color="secondary" aria-label="add" className={classes.fabButton}>
            {isComplete
              ? <Share list={list} />
              : location.pathname === selected.fabIcon.props.to
                ? selected.fabIcon
                : navIcon(selected.fabIcon)}
          </Fab> }
          <div className={classes.grow} />
          <IconButton className={classes.white} edge="end" color="inherit">
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
          anchor="bottom"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          onOpen={() => setIsDrawerOpen(true)}
        >
        <div className={classes.fullList} onClick={() => setIsDrawerOpen(false)}>
          <List className={classes.block}>
            {actions.map((action, index) => (
              <NavLink to={action.id} className={classes.resetLink} >
              <ListItem onClick={() => setSelected(action)} key={action.id}>
                <ListItemIcon>{action.menuIcon}</ListItemIcon>
                <ListItemText primary={action.label} />
              </ListItem>
              </NavLink>
            ))}
          </List>
          <Divider />
          <List className={classes.block}>
            <NavLink to={identity.id} className={classes.resetLink} >
              <ListItem button onClick={() => setSelected(identity)} key="1">
                <ListItemIcon>{identity.menuIcon}</ListItemIcon>
                <ListItemText primary={identity.label} />
              </ListItem>
            </NavLink>
          </List>
        </div>
      </SwipeableDrawer>
    </ThemeProvider>
  );
}

function Share({ list }) {
  const classes = useStyles();
  return <ShareIcon className={classes.white} onClick={e => console.log(list)} />;
}

function navIcon(icon) {
  const { to } = icon.props;

  return <Link to={to} replace={false} style={{ height: '24px' }}>{icon}</Link>;
}
