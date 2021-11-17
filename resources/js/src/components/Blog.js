/* eslint-disable no-unused-vars */
import { makeStyles } from '@material-ui/core/styles';
import React , {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import api from '../api';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

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
  },
  blogsContainer: {
    paddingTop: theme.spacing(3),
  },
  card: {
    maxWidth: "100%",
    marginTop: theme.spacing(3),
  },
  media: {
    height: 240
  },
  cardActions: {
    display: "flex",
    margin: "0 10px",
    justifyContent: "space-between"
  },
  author: {
    display: "flex"
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "center"
  }
}));

const Blog = () => {
  const classes = useStyles();
  const [blog, setBlog] = useState([]);
  const blogPost = async() =>{
    const result = await api.post('api/blog/showBlog');
    if(result.status == 200) {
      setBlog(result.data.blogData);
    }
  }

  useEffect(()=>{
    blogPost();
  },[]);

  return (
    <div>
      <Box className={classes.hero}>
        <Box>Blog Page</Box>
      </Box>

      {/* <Container maxWidth="lg" className={classes.blogsContainer}> */}
        <Grid container spacing={3}>
        <Box display='flex' flexDirection='row' justifyContent='center' className={classes.blogsContainer}>
          <Grid item xs={12} sm={6} md={4}>
          {
            blog.length == 0 ?
            ''
            :
            blog.map((datas)=>{
              return(
                
                  <Card className={classes.card}  key={datas.id}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image="https://images.pexels.com/photos/1464143/pexels-photo-1464143.jpeg?cs=srgb&dl=pexels-s-migaj-1464143.jpg&fm=jpg"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" color="primary">
                          {datas.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {datas.content}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions className={classes.cardActions}>
                      <Box className={classes.author}>
                        <Avatar src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
                        <Box ml={2}>
                          <Typography variant="subtitle2" component="p">
                            Jane Doe
                          </Typography>
                          <Typography variant="subtitle2" color="textSecondary" component="p">
                            May 14, 2021
                          </Typography>
                        </Box>
                      </Box>
                      <Box>
                        <BookmarkBorderIcon />
                      </Box>
                    </CardActions>
                  </Card>
              );
            })
          }
          </Grid>


        </Box>
        </Grid>
      {/* </Container> */}
    </div>
  );
}

export default Blog;

if (document.getElementById('blog')) {
    ReactDOM.render(<Blog />, document.getElementById('blog'));
}