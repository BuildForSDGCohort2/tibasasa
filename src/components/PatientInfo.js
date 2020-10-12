import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  Container,
  TextField,
  Typography,
} from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import { LockOutlined } from "@material-ui/icons";
import { SnackbarContext } from "../App";
import firebase from "../lib/firebase";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const isValid = (value, min, max) =>
  value !== '' &&
  value !== '-' &&
  (min === undefined || value >= min) &&
  (max === undefined || value <= max);

const UserInfo = () => {
  const classes = useStyles();

  const history = useHistory();

  const [date, changeDate] = useState(new Date());
  const [gen, setGen] = React.useState('');
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);

  const [error, setError] = useState("");

  const regexp = new RegExp(`^-?[0-9]*$`);

  const { setSnackbar } = useContext(SnackbarContext);

  const IntegerInput = ({ value, min, max, onChange }) => {
	const regexp = new RegExp(`^-?[0-9]*$`);
	const [internalValue, setInternalValue] = useState(value);
	const [valid, setValid] = useState(isValid(value, min, max));
	return (
	  <input type="text"
			 className={ valid ? '' : 'invalid' }
			 value={ internalValue }
			 onChange={ (event) => {
			   const newValue = event.target.value;
			   if (regexp.test(newValue)) {
				 setInternalValue(newValue);
				 let newValid = isValid(newValue, min, max);
				 setValid(newValid);
				 if (newValid) {
				   onChange(newValue);
				 }
			   }
			 } }
			 onBlur={ () => {
			   if (internalValue < min) {
				 setInternalValue(min);
			   } else if (internalValue > max) {
				 setInternalValue(max);
			   } else {
				 setInternalValue(value);
			   }
			   setValid(true);
			 } }
	  />
	);
  };

  const handleChange = (event) => {
    setGen(event.target.value);
  };

  var user = firebase.auth.currentUser.email;

  const submit = async () => {
    try {
      await firebase.createDoc("patients", {date, gen, weight, height, user});
      history.replace("/");
      setSnackbar({
        message: "Got your patient info :)!",
        open: true,
        color: "success",
      });
    } catch (error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      switch (errorCode) {
        case "auth/email-already-in-use":
          break;
        case "auth/weak-password":
          break;
        case "auth/invalid-email":
          break;
        default:
          setError(errorMessage);
          break;
      }
    }
    return false;
  };

  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return (
	<MuiPickersUtilsProvider utils={DateFnsUtils}>
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form
            className={classes.form}
            onSubmit={(e) => e.preventDefault() && false}
          >
			<p>Your DoB ?</p>
			<DatePicker
				autoOk
				autoFocus
        		orientation="landscape"
        		variant="static"
        		openTo="date"
        		value={date}
        		onChange={changeDate}
      		/>

			<FormControl className={classes.formControl}>
				<InputLabel id="demo-simple-select-helper-label">Gender</InputLabel>
				<Select
					labelId="demo-simple-select-helper-label"
					id="demo-simple-select-helper"
					value={gen}
					onChange={handleChange}
				>
					<MenuItem value="">
						<em>None</em>
					</MenuItem>
					<MenuItem value={10}>Male</MenuItem>
					<MenuItem value={20}>Female</MenuItem>
				</Select>
			</FormControl>

			<TextField 
				variant="outlined"
				margin="normal"
				required
				fullWidth
				label="Your Height"
				value = {height}
				min = {0}
				max = {300}
				onChange={ (e) => setHeight(e.target.value) }
			/>

			<TextField
				variant="outlined"
				margin="normal"
				required
				fullWidth
				label="Your Weight"
				value = {weight}
				min = {0}
				max = {300}
				onChange={ (e) => setWeight(e.target.value) }
			/>

            <Typography variant="body2" color="error">
              {error}
            </Typography>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              type="submit"
              onClick={submit}
            >
              Submit your info
            </Button>
            {}
          </form>
        </div>
      </Container>
    </div>
	</MuiPickersUtilsProvider>
  );
};

export default UserInfo;