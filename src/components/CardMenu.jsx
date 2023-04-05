import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from '@mui/icons-material/MoreVert';

const CardMenu = ({editHandler, deleteHandler}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (e) => {
        e.stopPropagation();
        setAnchorEl(e.currentTarget);
    };
    const handleClose = (e) => {
        e.stopPropagation();
        setAnchorEl(null);
    };

    const handleCloseWithCallback = (e, callback) => {
        e.stopPropagation();
        setAnchorEl(null);
        callback(e);
    };

    return (
        <div className="card-menu">
            <IconButton
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <MenuItem onClick={(e) => handleCloseWithCallback(e, editHandler)}>Edit</MenuItem>
                <MenuItem sx={{color: "red"}} onClick={(e) => handleCloseWithCallback(e, deleteHandler)}>Delete</MenuItem>
            </Menu>
        </div>
    );
}

export default CardMenu;