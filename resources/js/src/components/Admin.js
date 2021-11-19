import { makeStyles, Box, Grid, Typography, Card, CardActionArea, CardContent, CardActions, Button } from '@material-ui/core';
// import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import api from '../api'


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

const Admin = () => {
    const classes = useStyles();
    const [blog, setBlog] = useState([]);
    const [showChanges, setShowChanges] = useState('');

    const columns = [        
        {
            field: 'title',
            headerName: 'Blog Title',
            flex: 1,
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
            flex: 1,
            editable: false,
        },
        {
            field: 'created_at',
            headerName: 'Publish Date',
            flex: 1,
            editable: false,
        },
        {
            field: 'updated_at',
            headerName: 'Update Date',
            flex: 1,
            editable: false,
        },
        {
            field: 'id',
            flex: 1,
            renderCell: (params) => {
                console.log('------', params);
                return (
                    <div>
                        <Box className={classes.deleteButton}>
                            <Button
                                variant="outlined"
                                size='small'
                                color='secondary'
                                onClick={() => deleteBlog(params)}
                            >
                                Delete
                            </Button>
                        </Box>
                        <Box className={classes.unpublishButton}>
                            <Button
                                variant="outlined"
                                size='small'
                                color='secondary'
                                onClick={() => unpublishBlog(params)}
                            >
                                Unpublish
                            </Button>
                        </Box>                    
                    </div >
              )
          }
        },
      ];

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
}, [showChanges]);

return (
    <Box margin={'20px'}>
        <Grid container spacing={3}>
            <Grid item md={6}>
                <Typography variant="h5">BLOGS</Typography>

            {/* <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={blog}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
            />
            </div> */}


                {
                    blog.length == 0 ? '' :
                        blog.map((datas) => {
                            return (
                                <Card className={classes.card} key={datas.id} >
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
                                    </CardActions>
                                </Card>
                            );
                        })
                }
            </Grid>
            <Grid item md={6}>
                <Typography variant="h5">AUTHORS</Typography>
            </Grid>
        </Grid>
    </Box>
);
}

export default Admin;

if (document.getElementById('admin')) {
    ReactDOM.render(<Admin />, document.getElementById('admin'));
}
