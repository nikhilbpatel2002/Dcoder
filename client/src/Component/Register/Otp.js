import React,{useState} from 'react' ;
import "./Register.css" ;
import axios from "axios" ;
import {useHistory } from "react-router-dom" ;
import { useLocation } from 'react-router-dom';
import { TextField, Button, Typography, Paper, Link } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import useStyles from '../Form/styles';


function Otp()
{
    let [userOtp,setUserOtp] = useState({otp:""})
    const [alert, setAlert] = useState(null);

    let history = useHistory()
    const location = useLocation()
    const classes = useStyles();

    const validOtp=location.state.otp.toString()
    const {name,email,password}=location.state.user

    const [user , setUser] = useState({
        name : name,
        email : email,
        password : password,
    })
    
    function register ()
    {
        if(userOtp.otp===validOtp)
        {
            axios.post("http://localhost:5000/register_",user)
            .then ( res => {
                {
                    history.push("/login")
                }
                
            })
        }else{
            // alert("invalid")
            setAlert("Please Enter Correct OTP !!")
        }
    }

    function handleChange (e)
    {
        const {name,value}=e.target
        setUserOtp({
            [name]:value
        })
        console.log(value)
    }
    return (
        <>
        {alert ? <Alert icon={false} severity='error'>{alert}</Alert> : <></> }
            <Paper className={classes.paper}>
                <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}>
                    <Typography variant="h6">OTP</Typography>
                    <TextField name="otp" variant="outlined" label="****" fullWidth value={userOtp.otp} onChange={handleChange}/>
                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" fullWidth onClick={register}>Submit</Button>
                </form>
            </Paper>
        </>
    )
    
}

export default Otp ;