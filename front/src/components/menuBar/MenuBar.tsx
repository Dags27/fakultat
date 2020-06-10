import React from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, Theme } from '@material-ui/core/styles';


const makeClasses = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    }
}));

interface IMenuBarProps {
    onIconClick: () => void;
}

const MenuBar: React.FC<IMenuBarProps> = ({ onIconClick }) => {
    const classes = makeClasses();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        className={classes.menuButton}
                        onClick={() => onIconClick()}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        className={classes.title}
                    >
                        Movie Searcher
                    </Typography>
                </Toolbar>
            </AppBar>

        </div>
    );
};

export default MenuBar;