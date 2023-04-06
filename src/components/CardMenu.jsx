import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from '@mui/material/ListItemText';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';

const CardMenu = ({ editHandler, deleteHandler }) => {
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
        <ScopedCssBaseline sx={{backgroundColor: "transparent"}}>
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
                PaperProps={{  
                    style: {  
                      width: 110,  
                    },  
                 }} 
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <MenuItem
                    sx={{ color: "#595959" }}
                    onClick={(e) => handleCloseWithCallback(e, editHandler)}
                >
                    <EditIcon />
                    <ListItemText sx={{marginLeft: "6px"}}>Edit</ListItemText>
                </MenuItem>
                <MenuItem
                    sx={{ color: "red" }}
                    onClick={(e) => handleCloseWithCallback(e, deleteHandler)}
                >
                    <DeleteIcon />
                    <ListItemText sx={{marginLeft: "6px"}}>Delete</ListItemText>
                </MenuItem>
            </Menu>
        </div>
        </ScopedCssBaseline>
    );
};

export default CardMenu;
