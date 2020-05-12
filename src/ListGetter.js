import React from 'react';
import { useStyles } from "./styles";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Slide, IconButton, Divider, TextField, Button, Typography, CircularProgress, Backdrop } from '@material-ui/core';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { useHistory, useLocation } from 'react-router-dom';
import { listService } from './services/services';

export default function ListGetter({ ...props }) {
    const classes = useStyles();
    const history = useHistory();

    const [button, setButton] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [value, setValue] = React.useState('');

    const onClick = () => setLoading(true);
    const onChange = e => setValue(e.target.value);

    React.useEffect(() => {
        if (loading) {
            listService.fetchList(value).then(list => {
                setLoading(false);
                console.log(list);
                history.push('/shop/do/' + list.id);
            });
        }
    }, [ loading ]);

    return <Slide direction={props.direction || 'left'} in mountOnEnter unmountOnExit>
        <div style={{ height: '100vh' }}>
            <IconButton onClick={() => history.goBack()} className={classes.back}>
                <ArrowBackIcon />
            </IconButton>
            <Divider />
            <div className={classes.center}>
                <ShoppingBasketIcon fontSize="large" style={{ marginBottom: '16px' }} color="primary" />
                <Typography
                    style={{ marginBottom: '16px' }}
                    component="div"
                    variant="h5"
                    color="textPrimary"
                    >Új vásárlás</Typography>
                <Typography
                    style={{ marginBottom: '64px' }}
                    component="div"
                    color="textPrimary"
                    >Add meg a bevásárló lista azonosítóját!</Typography>
                <TextField value={value} onChange={onChange} id="outlined-basic" className={classes.list} autoComplete="off" label="Lista azonosító" variant="outlined" />
                <Button onClick={onClick} className={classes.white} style={{ position: 'relative' }} variant="contained" color="primary">
                    Vásárlás 
                </Button>
            </div>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    </Slide>;
}
