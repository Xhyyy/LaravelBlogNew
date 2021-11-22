/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import api from '../api';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core'
import { makeStyles, Button, IconButton, Typography, Box, Grid } from '@material-ui/core';
import { HighlightOff } from '@material-ui/icons';
import Add from './Add';
import Edit from './Edit';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const useStyles = makeStyles((theme) => ({
  hero: {
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.pexels.com/photos/4301252/pexels-photo-4301252.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")',
    height: "200px",
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

const Author = () => {
  const classes = useStyles();
  const [blog, setBlog] = useState([]);
  const [unpublishedBlogs, setUnpublishedBlogs] = useState([]);
  const [open, setOpen] = useState(false);
  const [showChanges, setShowChanges] = useState('');
  // const [id, setId] = useState();
  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogId, setBlogId] = useState(0);
  const [openEdit, setOpenEdit] = useState(false);

  // const [title, setTitle] = useState('');
  // const [content, setContent] = useState('');

  const authorBlogsListColumns = [
    {
      field: 'title',
      headerName: 'Blog Title',
      flex: 0.5,
      editable: false,
    },
    {
      field: 'content',
      headerName: 'Blog Content',
      flex: 1,
      editable: false,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 0.5,
      editable: false,
    },
    {
      field: 'created_at',
      headerName: 'Publish Date',
      flex: 0.5,
      editable: false,
      hide: true,
    },
    {
      field: 'updated_at',
      headerName: 'Update Date',
      flex: 0.5,
      editable: false,
      hide: true,
    },
    {
      field: 'Actions',
      flex: 1,
      renderCell: (params) => {
        // console.log('------the params', params.row);
        return (
          <div>
            <Button
              variant="outlined"
              size='small'
              color='primary'
              onClick={() => handleEditDialog(params.row)}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              size='small'
              color='secondary'
              onClick={() => unpublishBlog(params.row)}
            >
              Unpublish
            </Button>
          </div >
        )
      }
    },
  ];

  const authorUnpublishedBlogsListColumns = [
    {
      field: 'title',
      headerName: 'Blog Title',
      flex: 0.5,
      editable: false,
    },
    {
      field: 'content',
      headerName: 'Blog Content',
      flex: 1,
      editable: false,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 0.5,
      editable: false,
    },
    {
      field: 'created_at',
      headerName: 'Publish Date',
      flex: 0.5,
      editable: false,
      hide: true,
    },
    {
      field: 'updated_at',
      headerName: 'Update Date',
      flex: 0.5,
      editable: false,
      hide: true,
    },
    {
      field: 'Actions',
      flex: 1,
      renderCell: (params) => {
        // console.log('------the params', params.row);
        return (
          <div>
            <Button
              variant="outlined"
              size='small'
              color='primary'
              onClick={() => handleEditDialog(params.row)}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              size='small'
              color='secondary'
              onClick={() => publishBlog(params.row)}
            >
              Publish
            </Button>
          </div >
        )
      }
    },
  ];

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

  const authorShowUnpublishedBlogs = async () => {
    const result = await api.post('api/blog/authorShowUnpublishedBlogs');
    if(result.status == 200) {
      setUnpublishedBlogs(result.data.blogData);
    }
  }
  
  const publishBlog = async (data) => {
    setShowChanges('...Please wait');
    const dataToPublish = {
      id: data.id,
      status: 'published'
    }
    const response = await api.post('api/blog/addOrUpdate', dataToPublish);
    if (response.status == 200 && response.data.code == 200) {
      setShowChanges('Published');
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
    authorShowUnpublishedBlogs();
  }, [openEdit, open, showChanges]);

  return (
    <div>
      <Box className={classes.hero}>
        <Box>Author Page</Box>
      </Box>

      <Box margin={'20px'}>
        <Grid container spacing={3}>
          <Grid item md={6}>
            <Typography variant="h5">Published Blogs</Typography>
            <Button variant="outlined" color="primary" onClick={handleClickOpen} size='medium' style={{ maxHeight: '50px' }}>
              ADD NEW BLOG
            </Button>
            <div stylele={{ width: '100%' }}>
              <DataGrid
                rows={blog}
                columns={authorBlogsListColumns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                autoHeight={true}
                components={{
                  Toolbar: GridToolbar
                }}
              />
            </div>
          </Grid>
          <Grid item md={6}>
            <Typography variant="h5">Unpublished Blogs</Typography>
            <div stylele={{ width: '100%' }}>
              <DataGrid
                  rows={unpublishedBlogs}
                  columns={authorUnpublishedBlogsListColumns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  autoHeight={true}
                  components={{
                    Toolbar: GridToolbar
                  }}
                />
            </div>
          </Grid>
        </Grid>
      </Box>

      <Box>
        <Dialog onClose={handleClose} open={open}>
          <Box>
            <DialogTitle onClose={handleClose}>
              <IconButton onClick={handleClose}>
                <HighlightOff />
              </IconButton>
              <Box flexGrow={1} />
              Add New Blog Post
            </DialogTitle>
          </Box>

          <DialogContent>
            <Add
              handleClose={handleClose}
            />
          </DialogContent>
        </Dialog>
        <Dialog onClose={handleCloseEdit} open={openEdit}>
          <Box>
            <DialogTitle onClose={handleCloseEdit}>
              <IconButton onClick={handleCloseEdit}>
                <HighlightOff />
              </IconButton>
              <Box flexGrow={1} />
              Edit {blogTitle}
            </DialogTitle>
          </Box>
          <DialogContent>
            <Edit
              blogTitle={blogTitle}
              blogContent={blogContent}
              blogId={blogId}
              handleClose={handleCloseEdit}
            />
          </DialogContent>
        </Dialog>
      </Box>
    </div>
  );
}

export default Author;

if (document.getElementById('author')) {
  ReactDOM.render(<Author />, document.getElementById('author'));
}