import React from 'react';
import { Drawer } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useHistory } from 'react-router';

const makeClasses = makeStyles((theme: Theme) => ({
    background:{
        backgroundColor:"#6EB4D1",
    },
    drawerContent: {
        width:"100%",
        height:"100%",
        backgroundColor:"#6EB4D1",
        padding: "0px 20px 0 20px"
        
    },
    dots:{
        padding: "0",
        listStyleType:"none"
    },
    menu:{
        marginLeft:"20%",
        marginBottom:"20px",
    },
    button:{
        marginBottom:"10px",
        padding:"5px",
        fontSize:"16px",
        width:"150px"
    }
}));

interface IDrawerComponentProps {
    shouldBeOpen: boolean,
    onOtherClick: () => void;
}

const DrawerComponent: React.FC<IDrawerComponentProps> = ({ shouldBeOpen, onOtherClick }) => {
    const classes = makeClasses();
    const [isOpen, setIsOpen] = React.useState(false);
    const history = useHistory();

    const redirectTo = (path: string, name: string) => <div onClick={() => history.push(path)}>{name}</div>;
    
    return (
        <div onClick={()=>onOtherClick()}>
            <Drawer
                open={isOpen || shouldBeOpen}
                onClose={() => setIsOpen(false)}
            >
                <div className={classes.drawerContent}>
                    <ul className={classes.dots}>
                        <li><h2 className={classes.menu}>MENU</h2></li>
                        <li><button className={classes.button}>{redirectTo('/', 'Home')}</button></li>
                        <li><button className={classes.button}>{redirectTo('/search', 'Search Movie')}</button></li>
                    </ul>
                </div>
            </Drawer>
        </div>
    );
};

export default DrawerComponent;