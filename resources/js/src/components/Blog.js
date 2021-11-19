/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import api from '../api';
import { Dialog, DialogTitle, DialogContent, ButtonBase, Container } from '@material-ui/core'
import { makeStyles, Button, IconButton, Typography, Box, Grid, Card, CardActionArea, CardActions, CardContent } from '@material-ui/core';
import { HighlightOff } from '@material-ui/icons';
import Add from './Add';
import Edit from './Edit';

const useStyles = makeStyles((theme) => ({
  hero: {
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.pexels.com/photos/4301252/pexels-photo-4301252.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")',
    height: "350px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "4rem",
    marginBottom: 50,
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
    width: '100vw',
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
  },
  titleRoot: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  contentRoot: {
    padding: theme.spacing(2),
  },
  actionRoot: {
    margin: 0,
    padding: theme.spacing(1),
  }
}));


const Blog = () => {
  const classes = useStyles();
  const [blog, setBlog] = useState([]);
  const [open, setOpen] = useState(false);
  const [showChanges, setShowChanges] = useState('');
  // const [id, setId] = useState();
  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogId, setBlogId] = useState(0);
  const [openEdit, setOpenEdit] = useState(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleEditDialog = (data) => {
    console.log(data);
    setBlogTitle(data.title);
    setBlogContent(data.content);
    setBlogId(data.id);
    setOpenEdit(true);
  }

  const handleCloseEdit = () => {
    setOpenEdit(false);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const blogPost = async () => {
    const result = await api.post('api/blog/showBlog');
    if (result.status == 200) {
      setBlog(result.data.blogData);
    }
  }

  const deleteBlog = async (data) => {
    setShowChanges('...Delete on Process');
    const dataToDelete = {
      id: data.id,
      status: 'deleted'
    }
    const response = await api.post('api/blog/addOrUpdate', dataToDelete);
    if (response.status == 200 && response.data.code == 200) {
      setShowChanges('Deleted');
      alert(response.data.message);
    } else {
      alert('ERROR!');
    }
  }

  const unpublishBlog = async (data) => {
    setShowChanges('...Please wait');
    const dataToUnpublish = {
      id: data.id,
      status: 'unpublish'
    }
    const response = await api.post('api/blog/addOrUpdate', dataToUnpublish);
    if (response.status == 200 && response.data.code == 200) {
      setShowChanges('Unpblished');
      alert(response.data.message);
    } else {
      alert('ERROR!');
    }
  }

  useEffect(() => {
    blogPost();
  }, [openEdit, open, showChanges]);

  return (
    <div>
      <Box className={classes.hero}>
        <Box>Blog Page</Box>
      </Box>
      <Container>
        <Grid container spacing={3}>
            {
              blog.length == 0 ? '' :
                blog.map((datas) => {
                  return (
                    <Grid item xs={12} sm={6} md={4} key={datas.id}>
                      <Card className={classes.card} >
                        <CardActionArea>
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
                          <Box display='flex' flexDirection='column'>
                            <Box className={classes.author}>
                              <Box>
                                <Typography variant="subtitle2" component="p">
                                  By: Jane Doe
                                </Typography>
                                <Typography variant="subtitle2" color="textSecondary" component="p">
                                  Published Date: {datas.created_at}
                                </Typography>
                              </Box>
                            </Box>
                            <Box display='flex' flexDirection='row'>
                              <Box className={classes.editButton}>
                                <Button
                                  variant="outlined"
                                  size='small'
                                  color='primary'
                                  onClick={() => handleEditDialog(datas)}
                                >
                                  Edit
                                </Button>
                              </Box>
                              <Box className={classes.deleteButton}>
                                <Button
                                  variant="outlined"
                                  size='small'
                                  color='secondary'
                                  onClick={() => deleteBlog(datas)}
                                >
                                  Delete
                                </Button>
                              </Box>
                              <Box className={classes.unpublishButton}>
                                <Button
                                  variant="outlined"
                                  size='small'
                                  color='secondary'
                                  onClick={() => unpublishBlog(datas)}
                                >
                                  Unpublish
                                </Button>
                              </Box>
                            </Box>
                          </Box>
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                })
            }
          
        </Grid>
      </Container>
    </div>
  );
}

export default Blog;

if (document.getElementById('blog')) {
  ReactDOM.render(<Blog />, document.getElementById('blog'));
}