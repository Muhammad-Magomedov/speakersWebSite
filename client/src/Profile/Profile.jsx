import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { speakerById, uploadAvatar } from '../redux/features/speakers'
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MicIcon from "@material-ui/icons/Mic";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Avatar, Container, Fab, Paper, TextField, Typography } from '@material-ui/core'
import { Button } from "@material-ui/core";
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import EditIcon from "@material-ui/icons/Edit";
import { NavLink } from 'react-router-dom'
import { getVoices } from '../redux/features/voices'
import AddIcon from "@material-ui/icons/Add";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  dataWidth: {
    width: 400,
    display: "flex",
    justifyContent: "space-between",
  },
  mainFeaturesPost: {
    position: "relative",
    color: theme.palette.common.white,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  mainFeaturesPostContent: {
    position: "relative",
    padding: theme.spacing(6),
    marginTop: theme.spacing(1),
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,.3)",
  },
  audio: {
    height: 50,
    marginTop: 30,
    width: 500,
    "&::-webkit-media-controls-panel": {
      backgroundColor: '#f50057'
    },
    "&::-webkit-media-controls-current-time-display": {
      color: 'white'
    }
  },
  add: {
    position: 'fixed',
    bottom: 30,
    right: 300
  },
  edit: {
    position: 'fixed',
    bottom: 30,
  },
  hover: {

  }
}));

function Profile({setIsEditing}) {
  const dispatch = useDispatch();
  const speaker = useSelector((state) => state.speakers.items);
  const voices = useSelector(state => state.voices.items)
  const [avatar, setAvatar] = useState(null)
  useEffect(() => {
    dispatch(getVoices())
  }, [dispatch])

  useEffect(() => {
    dispatch(speakerById());
  }, [dispatch]);

  const classes = useStyles();

  const handleUploadAvatar = (e) => {
    setAvatar(e.target.files[0])
  }

  const handleSub = () => {
    dispatch(uploadAvatar(avatar))
  }
 // const handleChange = (e) => {
 //   dispatch(uploadAvatar({avatar}))
 //  }


  return (
            <div className={classes.content}>
                 <div className={classes.dataWidth}>
                   <Box>
                     {/*<Avatar src={speaker.avatar} style={{width: 200, height: 200, borderRadius: 0, marginRight: 30}}/>*/}
                     <input accept='image/*' type='file' onChange={handleUploadAvatar}/>
                     <Button onClick={handleSub}>UP</Button>
                   </Box>
              <Box>
             <h2 style={{color: 'white'}}>
               {" "}
               {speaker.firstName} {}
              {speaker.lastName}
               </h2>
                   <Box>
                 <Typography style={{color: 'white', fontSize: 25, marginTop: 90}}>
                    Цена: от {speaker.cost} ₽
                  </Typography>
                 </Box>
               </Box>
                 {/* <Button>
             <EditIcon />
          </Button> */}
                 </div>
                  <div>
                   <Typography style={{color: 'white', marginLeft: 230, fontSize: 20}}>
                    {speaker.description}
                   </Typography>
                  </div>
              {voices.map(voice => {
                return(
                  <div style={{marginLeft: 300, marginTop: 30}}>
                    <audio
                      className={classes.audio}
                      src={voice.audio}
                      controls
                    ></audio>
                  </div>
                )
              })}
              <Grid item  classes={{root: classes.add}}>
                <Fab style={{backgroundColor: 'black', color: 'white'}} aria-label="add" >
                  <AddIcon />
                </Fab>
              </Grid>
              <Grid item  classes={{root: classes.edit}}>
              <Fab style={{backgroundColor: 'black',

                color: 'white'
              }} aria-label="edit" onClick={() => setIsEditing(true)}>
                <EditIcon  />
              </Fab>
              </Grid>
              {/*<p>Телефон</p>*/}
                {/*<div style={{ display: "flex" }}>*/}
                {/*  <p>Не указан</p>*/}
               {/*  <Button color="primary">Добавить</Button>*/}
                 {/*  <div></div>*/}
                 {/*</div>*/}
             </div>
    // <div style={{width: '100%', height: 750, backgroundImage: `url(https://images.wallpaperscraft.ru/image/mikrofon_zvuk_muzyka_108048_1920x1080.jpg)`}}>
    // <Container style={{marginTop: 30}}>
    //   <Paper style={{height: 750,backgroundImage: `url(https://images.wallpaperscraft.ru/image/mikrofon_zvuk_muzyka_108048_1920x1080.jpg)`}}>
    // <div className={classes.root}>
    //   <div className={classes.content}>
    //       <div className={classes.dataWidth}>
    //         <Avatar style={{width: 200, height: 200, borderRadius: 0, marginRight: 30}}/>
    //         <Box>
    //         <h2 style={{color: 'white'}}>
    //           {" "}
    //           {speaker.firstName} {}
    //           {speaker.lastName}
    //         </h2>
    //           <Box>
    //             <Typography style={{color: 'white', fontSize: 25, marginTop: 90}}>
    //               Цена: от {speaker.cost} ₽
    //             </Typography>
    //           </Box>
    //         </Box>
    //         {/* <Button>
    //           <EditIcon />
    //         </Button> */}
    //       </div>
    //         <div>
    //           <Typography style={{color: 'white',marginTop: 110, marginLeft: 230, fontSize: 20}}>
    //             {speaker.description}
    //           </Typography>
    //         </div>
    //       {/*<p>Телефон</p>*/}
    //       {/*<div style={{ display: "flex" }}>*/}
    //       {/*  <p>Не указан</p>*/}
    //       {/*  <Button color="primary">Добавить</Button>*/}
    //       {/*  <div></div>*/}
    //       {/*</div>*/}
    //   </div>
    //   <div
    //     className={classes.drawer}
    //     classes={{
    //       paper: classes.drawerPaper,
    //     }}
    //   >
    //     <div className={classes.drawerContainer}>
    //       <List style={{backgroundColor: '#f50057'}}>
    //         {["Личные данные", "Аудиозаписи"].map((text, index) => (
    //           <ListItem button key={text}>
    //             <ListItemText style={{color: 'white'}} primary={text} />
    //             <ListItemIcon style={{color: 'white'}}>
    //               {index % 2 === 0 ? <AccountCircleIcon /> : <MicIcon />}
    //             </ListItemIcon>
    //           </ListItem>
    //         ))}
    //       </List>
    //     </div>
    //   </div>
    // </div>
    //   </Paper>
    // </Container>
    // </div>
  );
}

export default Profile;
