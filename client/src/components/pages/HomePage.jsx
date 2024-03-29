import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRandomSpeakers, getSpeakers } from '../../redux/features/speakers'
import { Button, Container, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Carousel } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import AboutsUs from "../AboutsUs";
import Footer from "../Footer";
import HomePagePreloader from "../HomePagePreloader";
import { createMuiTheme, ThemeProvider } from '@material-ui/core';



const useStyless = makeStyles((theme) => {
  return {
    root: {
      backgroundColor: 'inherit',
      height: 40,
      marginTop: 10,
      // marginLeft: 1,
      width: 400,
      lineHeight: '3px'
    },

    loopIcon: {
      color: '#f50057',
      '&.selected': {
        color: '#f50057',
      },
      '&:hover': {
        color: 'white',
      },
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    playIcon: {
      color: '#f50057',
      '&:hover': {
        color: 'white',
      },
    },
    replayIcon: {
      color: '#f50057',
    },
    pauseIcon: {
      color: '#f50057',
      '&:hover': {
        color: 'white',
      },
    },
    volumeIcon: {
      color: '#f50057',
      '&:hover': {
        color: 'white',
      },
    },
    volumeSlider: {
      color: '#f50057',
    },
    progressTime: {
      color: '#f50057',
    },
    mainSlider: {
      color: '#f50057',
      '& .MuiSlider-rail': {
        color: 'white',
      },
      '& .MuiSlider-track': {
        color: '#f50057',
      },
      '& .MuiSlider-thumb': {
        color: '#f50057',
      },
    },
  };
});

const useStyles = makeStyles((theme) => ({
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
    backgroundColor: "rgba(0,0,0,.4)",
  },
  blockInfo: {
    height: 500,
    width: 500,
    marginLeft: 50,
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "white",
    color: "black",
    fontWeight: "bold",
    width: 220,
    "&:hover": {
      backgroundColor: "rgba(255,255,255, 0.8)",
    },
  },
  audio: {
    backgroundColor: "black",
    height: 30,
    marginTop: 30,
    "&::-webkit-media-controls-panel": {
      backgroundColor: "#f50057",
    },
    "&::-webkit-media-controls-current-time-display": {
      color: "white",
    },
  },
}));

function HomePage(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const speakers = useSelector((state) => state.speakers.items);
  const loading = useSelector((state) => state.speakers.loading);

  useEffect(() => dispatch(getRandomSpeakers()), [dispatch]);

  if(loading) {
    return <HomePagePreloader/>
  }

  return (
    <>
      <Paper
        className={classes.mainFeaturesPost}
        style={{
          backgroundImage: `url(https://images.wallpaperscraft.ru/image/mikrofon_zvuk_muzyka_108048_1920x1080.jpg)`,
        }}
      >
        <Container fixed>
          <div className={classes.overlay} />
          <Grid container>
            <Grid item md={6}>
              <div className={classes.mainFeaturesPostContent}>
                <Typography variant="h3" color={"inherit"} gutterBottom>
                  База <span style={{ color: "#f50057" }}>#1</span> по подбору
                  записи и <span style={{ color: "#f50057" }}>дикторов</span>
                </Typography>
                <Typography
                  style={{ fontSize: 18 }}
                  color={"inherit"}
                  paragraph
                >
                  Озвучим текст, ролик, видеопрезентацию, автоответчик. Сделаем
                  аудиоролик любой сложности. <br />
                  Напишем сценарий под любые ваши задачи. Джинглы для радио!
                  Авторская музыка! И… мы знаем, как сделать красивый звук!
                </Typography>
                <Button
                  style={{ fontWeight: "bold" }}
                  variant="contained"
                  color="secondary"
                >
                  Узнать больше
                </Button>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Paper>
      <div style={{ height: 20, backgroundColor: "black" }}></div>
      <Carousel>
        {speakers.map((speaker) => {
          return (
            <Carousel.Item
              style={{
                height: 700,
                backgroundImage: `url(https://images.wallpaperscraft.ru/image/mikrofon_apparatura_zvuk_razmytosti_120196_1920x1080.jpg)`,
              }}
            >
              <div
                style={{
                  width: 1000,
                  height: 440,
                  backgroundColor: "black",
                  marginTop: 135,
                  marginLeft: 350,
                  borderRadius: 5,
                  opacity: 0.8,
                }}
              >
                <div style={{ display: "flex" }}>
                  <div>
                    <img
                      style={{ height: "440px", width: 450, borderRadius: 5 }}
                      src={speaker?.avatar}
                      alt="First Slide"
                    />
                  </div>
                  <div className={classes.blockInfo}>
                    <div style={{ marginTop: 50 }}>
                      <Typography variant={"h4"} style={{ color: "white" }}>
                        {speaker?.firstName} {speaker?.lastName}
                      </Typography>
                    </div>
                    <div>
                      <audio
                        className={classes.audio}
                        src={speaker.lastVoice?.audio}
                        controls
                      ></audio>
                    </div>
                    <div style={{ marginTop: 20 }}>
                      <Typography style={{ color: "white", marginRight: 25 }}>
                        {speaker?.description}
                      </Typography>
                    </div>
                    <div style={{ marginTop: 25 }}>
                      <Typography variant={"h6"} style={{ color: "white" }}>
                        Количество работ: {speaker.voices?.length}
                      </Typography>
                    </div>
                    <div
                      style={{
                        textAlign: "end",
                        marginRight: 30,
                        marginTop: 10,
                      }}
                    >
                      <Typography variant={"h6"} style={{ color: "white" }}>
                        {" "}
                        Цена: от {speaker?.cost}₽
                      </Typography>
                      <Button style={{width: 142}} color={"secondary"} variant={"contained"}>
                        Заказать
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Carousel.Item>
          );
        })}
      </Carousel>
      <div
        style={{ height: 80, backgroundColor: "black", textAlign: "center" }}
      >
        <NavLink style={{ textDecoration: "none" }} to="/showAll">
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Show all speakers
          </Button>
        </NavLink>
      </div>
      <AboutsUs />
      <Footer />
    </>
  );
}

export default HomePage;
