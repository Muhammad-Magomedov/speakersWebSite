import React, { useEffect } from "react";
import {
  Button,
  TableRow,
  TableBody,
  TableCell,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Link,NavLink } from "react-router-dom";
import {getSpeakers} from "../../../redux/features/speakers";
import {useDispatch, useSelector} from "react-redux";
import Preloader from "../../Preloader";
import { loadRatingsBySort } from '../../../redux/features/ratings'

const useStyles = makeStyles((theme) => ({
  audio: {
    height: 30,
    marginTop: 10,
    "&::-webkit-media-controls-panel": {
      backgroundColor: "#f50057",
    },
    "&::-webkit-media-controls-current-time-display": {
      color: "white",
    },
  },
  navlink: {
    color: "white",
    '&:hover': {
      textDecoration: 'none',
      color: "rgba(255,255,255, 0.7)",
    }
  },
  // button: {
  //   backgroundColor: "#f50057", color: "white", fontWeight: "bold",
  //   '&:hover': {
  //     textDecoration: 'none',
  //     color: "rgba(0,0,0, 0.1)",
  //   }
  // }
}));

function SpeakersBody({ speaker }) {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.speakers.loading)
  const ratings = useSelector(state => state.ratings.items)
  useEffect(() => dispatch(getSpeakers()), [dispatch]);
  useEffect(() => dispatch(loadRatingsBySort()),[dispatch])
  const loadByRating = ratings.find(item => {
    if(item._id === speaker._id) {
      return item
    }
    return null
  })
  const fixedRating = loadByRating?.rating.toFixed(1)
  console.log(loadByRating?.rating.toFixed(1))

  const classes = useStyles();


  if(loading) {
    return <Preloader/>
  }

  return (
    <TableBody>
      <TableRow>
        <TableCell style={{ width: 120 }}>
          <img
            src={speaker.avatar}
            alt={"avatar"}
            width="70px"
            style={{ borderRadius: 70 }}
          />
        </TableCell>
        <TableCell style={{ width: 500 }}>
          <Typography variant="h4" style={{ color: "white" }}>
            <NavLink className={classes.navlink} to={`/speaker/${speaker._id}`}>
              {speaker.firstName} {speaker.lastName}
            </NavLink>
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="h4" style={{ color: "white" }}>
              {fixedRating}
          </Typography>
        </TableCell>
        <TableCell>
          <div>
            <audio
              className={classes.audio}
              src={speaker.lastVoice?.audio}
              controls
            ></audio>
          </div>
        </TableCell>
        <TableCell>
          <Typography
            style={{ width: 70, color: "white", fontSize: 20, fontWeight: "bold" }}
          >
            {" "}
            {speaker.cost} ₽
          </Typography>
        </TableCell>
        <TableCell>
          <NavLink className={classes.navlink} to='/payment'>
          <Button className={classes.button} style={{ backgroundColor: "#f50057", color: "white", fontWeight: "bold",}} >
            Заказать
          </Button>
          </NavLink>
        </TableCell>
      </TableRow>
    </TableBody>
  );
}

export default SpeakersBody;
