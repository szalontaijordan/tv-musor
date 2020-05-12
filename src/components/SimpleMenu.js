import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreIcon from '@material-ui/icons/MoreVert';
import { IconButton } from '@material-ui/core';

export default function SimpleMenu({ items }) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return <React.Fragment>
        <IconButton onClick={handleClick} aria-label="more" aria-haspopup="true" aria-controls="simple-menu">
            <MoreIcon />
        </IconButton>
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            {items.map((item, index) => <MenuItem key={index} onClick={handleClose}>{item}</MenuItem>)}
        </Menu>
    </React.Fragment>;
}
