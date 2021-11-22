import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppBar, Toolbar, Typography, Link } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#fff',
    flexGrow: 1
  },
  pageTitle: {
    flexGrow: 1
  },
  loginButton: {
    marginRight: '10px'
  },
  registerButton: {
    marginLeft: '10px'
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
          <Link href="http://myblog.com/" underline="none" className={classes.pageTitle}>
            <Typography variant="h6" color="primary" >
              My Blog
            </Typography>
          </Link>
          <Link href="http://myblog.com/login-page" className={classes.loginButton}>
            <Typography color="primary">
              Login
            </Typography>
          </Link>
          <Typography color="primary">
              |
            </Typography>
          <Link href="http://myblog.com/register-page" className={classes.registerButton}>
            <Typography color="primary">
              Register
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;

if (document.getElementById('header')) {
  ReactDOM.render(<Header />, document.getElementById('header'));
}