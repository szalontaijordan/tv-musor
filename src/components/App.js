import React from 'react';
import CreateIcon from '@material-ui/icons/Create';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

import './css/App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { useStyles } from '../styles';

import CheckboxList from './CheckboxList';
import ListGetter from './ListGetter';
import Shop from './Shop';
import ActiveList from './ActiveList';
import Create from './Create';
import Identity from './Identity';
import Navigation from './Navigation';
import BottomAppBar from './BottomAppBar';

export default function App() {
  const classes = useStyles();

  const actions = [
    { label: 'Lista írás', id: '/create', menuIcon: <CreateIcon />, fabIcon: <CreateIcon className={classes.white} /> },
    { label: 'Bevásárlás', id: '/shop', menuIcon: <ShoppingBasketIcon />, fabIcon: <ShoppingBasketIcon className={classes.white} /> }
  ];
  const identity = { label: 'Azonosító', id: '/identity', menuIcon: <PermIdentityIcon />, fabIcon: null };

  const [selected, setSelected] = React.useState(null);
  const [shoppingList, setShoppingList] = React.useState({});
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const router = <Switch>
    <Route path="/" exact strict><Redirect to={{ pathname: '/create' }} /></Route>
    <Route path="/shop" exact strict><Shop /></Route>
    <Route path="/shop/new" exact strict><ListGetter /></Route>
    <Route path="/shop/do/:id" exact strict><ActiveList /></Route>
    <Route path="/create" exact strict><Create /></Route>
    <Route path="/create/:id" exact strict><CheckboxList /></Route>
    <Route path="/identity" exact strict><Identity /></Route>
  </Switch>;

  const navigation = <Navigation
    isDrawerOpen={isDrawerOpen}
    setIsDrawerOpen={setIsDrawerOpen}
    setSelected={setSelected}
    actions={actions}
    identity={identity} />;

  return <Router>
    <BottomAppBar
      children={router}
      navigation={navigation}
      setIsDrawerOpen={setIsDrawerOpen}
      selected={selected} />
  </Router>;
}
