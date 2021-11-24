import { makeStyles, Box, Grid, Typography, Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import ReactDOM from 'react-dom';
import api from '../api'

const useStyles = makeStyles((theme) => ({
  hero: {
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.pexels.com/photos/4301252/pexels-photo-4301252.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")',
    height: "150px",
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
  }
}));

const Admin = () => {
  const classes = useStyles();
  // const [blog, setBlog] = useState([]);
  const [adminBlogsList, setAdminBlogsList] = useState([]);
  const [adminUsersList, setAdminUsersList] = useState([]);
  const [adminDisabledUsersList, setadminDisabledUsersList] = useState([]);
  const [adminUnpublishedBlogs, setAdminUnpublishedBlogs] = useState([]);
  const [adminDeletedBlogs, setadminDeletedBlogs] = useState([]);
  const [showChanges, setShowChanges] = useState('');

  const adminBlogsListsColumns = [
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
              color='secondary'
              onClick={() => deleteBlog(params.row)}
            >
              Delete
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

  const adminUnpublishedBlogsListColumns = [
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
              color='secondary'
              onClick={() => deleteBlog(params.row)}
            >
              Delete
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

  const adminDeletedBlogsListColumns = [
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
      field: 'Actions',
      flex: 1,
      renderCell: (params) => {
        // console.log('------the params', params.row);
        return (
          <div>
            <Button
              variant="outlined"
              size='small'
              color='secondary'
              onClick={() => publishBlog(params.row)}
            >
              Restore
            </Button>
          </div >
        )
      }
    },
  ];

  const adminActiveUsersListColumns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      editable: false
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      editable: false
    },
    {
      field: 'role',
      headerName: 'Role',
      flex: 1,
      editable: false
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      editable: false
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
              color='secondary'
              onClick={() => disableUser(params.row)}
            >
              Disable
            </Button>
          </div >
        )
      }
    },
  ];

  const adminDisabledUsersListColumns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      editable: false
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      editable: false
    },
    {
      field: 'role',
      headerName: 'Role',
      flex: 1,
      editable: false
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      editable: false
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
              color='secondary'
              onClick={() => enableUser(params.row)}
            >
              Enable
            </Button>
          </div >
        )
      }
    },
  ];


  const adminBlogPost = async () => {
    const result = await api.post('api/blog/adminShowBlog');
    if (result.status == 200) {
      setAdminBlogsList(result.data.blogData);
    }
  }

  const unpublishedBlogPosts = async () => {
    const result = await api.post('api/blog/adminShowUnpublishedBlogs');
    if(result.status == 200) {
      setAdminUnpublishedBlogs(result.data.blogData);
    }
  }

  const deletedBlogPosts = async () => {
    const result = await api.post('api/blog/showDeletedBlogs');
    if(result.status == 200) {
      setadminDeletedBlogs(result.data.blogData);
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

  const adminShowUsers = async () => {
    const result = await api.post('api/user/showUser');
    if (result.status == 200) {
      setAdminUsersList(result.data.data);
    }
  }

  const adminShowDisabledUsers = async () => {
    const result = await api.post('api/user/showDisabledUsers');
    if (result.status == 200) {
      setadminDisabledUsersList(result.data.data);
    }
  }

  const disableUser = async (data) => {
    setShowChanges('...Please wait');
    const statusToSend = {
      id: data.id,
      status: 'disabled'
    }
    const response = await api.post('api/user/updateUser', statusToSend);
    if (response.status == 200 && response.data.code == 200) {
      setShowChanges('User Disabled');
      alert(response.data.message);
    } else {
      alert('ERROR');
    }
  }

  const enableUser = async (data) => {
    setShowChanges('...Please wait');
    const statusToSend = {
      id: data.id,
      status: 'enabled'
    }
    const response = await api.post('api/user/updateUser', statusToSend);
    if (response.status == 200 && response.data.code == 200) {
      setShowChanges('User Enabled');
      alert(response.data.message);
    } else {
      alert('ERROR');
    }
  }

  useEffect(() => {
    adminBlogPost();
    adminShowUsers();
    adminShowDisabledUsers();
    unpublishedBlogPosts();
    deletedBlogPosts();
  }, [showChanges]);

  return (
    <div>
      <Box className={classes.hero}>
        <Box>Admin Page</Box>
      </Box>
      <Box margin={'20px'}>
        <Grid container spacing={3}>
          <Grid item md={6}>
            <Typography variant="h3">BLOGS</Typography>
            <Typography variant="h6">PUBLISHED BLOGS</Typography>
            <div style={{ width: '100%' }}>
              <DataGrid
                rows={adminBlogsList}
                columns={adminBlogsListsColumns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                autoHeight={true}
                components={{
                  Toolbar: GridToolbar
                }}
              />
            </div>
            <Typography variant="h6">UNPUBLISHED BLOGS</Typography>
            <div stylele={{ width: '100%' }}>
              <DataGrid
                  rows={adminUnpublishedBlogs}
                  columns={adminUnpublishedBlogsListColumns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  autoHeight={true}
                  components={{
                    Toolbar: GridToolbar
                  }}
                />
            </div>
            <Typography variant="h6">DELETED BLOGS</Typography>
            <div stylele={{ width: '100%' }}>
              <DataGrid
                  rows={adminDeletedBlogs}
                  columns={adminDeletedBlogsListColumns}
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
            <Typography variant="h3">AUTHORS</Typography>
            <Typography variant="h6">ACTIVE USERS</Typography>
            <div style={{ width: '100%' }}>
              <DataGrid
                rows={adminUsersList}
                columns={adminActiveUsersListColumns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                autoHeight={true}
                components={{
                  Toolbar: GridToolbar
                }}
              />
            </div>
            <Typography variant="h6">DISABLED USERS</Typography>
            <div style={{ width: '100%' }}>
              <DataGrid
                rows={adminDisabledUsersList}
                columns={adminDisabledUsersListColumns}
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
    </div>
  );
}

export default Admin;

if (document.getElementById('admin')) {
  ReactDOM.render(<Admin />, document.getElementById('admin'));
}
