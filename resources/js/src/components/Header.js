import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    appBar: {
      backgroundColor: '#fff'
    },
    hero: {
      backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.pexels.com/photos/4301252/pexels-photo-4301252.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")',
      height: "500px",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#fff",
      fontSize: "4rem",
      [theme.breakpoints.down("sm")]: {
        height: 300,
        fontSize: "3em"
      }
    }
}));

const Header = () => {
    const classes = useStyles();
    return (
        <div className="App">
            <AppBar className={classes.appBar} position="static">
                <Toolbar>
                <Typography variant="h6" color="primary" >
                    My Blog
                </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;

if (document.getElementById('header')) {
    ReactDOM.render(<Header />, document.getElementById('header'));
}