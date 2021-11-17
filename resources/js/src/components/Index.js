import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
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

const Index = () => {
    const classes = useStyles();
    return (
        <div className="App">
            <Box className={classes.hero}>
                <Box>Home Page</Box>
            </Box>
      </div>
    );
}

export default Index;

if (document.getElementById('index')) {
    ReactDOM.render(<Index />, document.getElementById('index'));
}
