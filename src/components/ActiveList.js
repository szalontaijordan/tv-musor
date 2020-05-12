import React from 'react';
import { useParams } from 'react-router-dom';

import { Backdrop, CircularProgress } from '@material-ui/core';
import { useStyles } from '../styles';
import CheckboxList from './CheckboxList';
import { listService } from '../services/services';

export default function ActiveList({ ...props }) {
    const { id } = useParams();
    const classes = useStyles();
    const [list, setList] = React.useState(null);

    React.useEffect(() => {
        listService.fetchList(id).then(list => setList(list));
    }, []);

    return <React.Fragment>
        <Backdrop className={classes.backdrop} open={!list}><CircularProgress color="inherit" /></Backdrop>
        {list && <CheckboxList
            initialTitle={list.title}
            initialList={list.list}
            id={list.id}
            date={list.date}
            immutable
            onComplete={x => console.log(x)} />}
    </React.Fragment>;
}
