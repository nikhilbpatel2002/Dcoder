import React,{useState} from 'react' ;
import { TextField, Button, Typography, Paper, Link } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import "./Register.css" ;
import axios from "axios" ;
import {useHistory} from "react-router-dom"
import useStyles from '../Form/styles';


function ForgotPassword ({showAlert}) {
    let history = useHistory()
    const classes = useStyles();
    const [alert, setAlert] = useState(false);
    const [otp,setOtp] =useState("")
    const [serverOtp,setServerOtp] = useState("")
    const [user , setUser] = useState({
        email : "",
        password : "",
        rePassword:""
    })

    function handleChange (e)
    {
        const {name , value} = e.target
        
        setUser({
            ...user,
            [name] : value
        })
    }
    function handleOtpChange (e)
    {
        setOtp(e.target.value)
    }


    function sendOtp ()
    {
        const {email,password,rePassword}=user
        
        if(email && password && password===rePassword)
        {
            // alert("valid")
            axios.post("http://localhost:5000/forgotPassword",user)
            .then ( res => {
                {
                    if (res.data.message)
                    {
                        setAlert(res.data.message)
                        // showAlert(res.data.message,"warning")
                        history.push("/forgotPassword")
                    }
                    else
                    {
                        setServerOtp(res.data.OTP)
                        // history.push({
                        //     pathname:"/register/otp",
                        //     state:{ otp :res.data.OTP , user : res.data.user}
                        // })
                    }
                }
                
            })
        }else{
            // showAlert("Fill up complete form","danger")
            setAlert(true);
        }
        
    }
    
    function register ()
    {
        if(otp==serverOtp)
        {
            axios.put("http://localhost:5000/forgotPassword/otp",user)
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

    return(
        <>
        {alert ? <Alert icon={false} severity='error'>{alert}</Alert> : "" }
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}>
                <Typography variant="h6">Reset Password</Typography>
                <TextField required name="email" variant="outlined" label="Email" fullWidth value={user.email} onChange={handleChange} />
                <TextField required name="password" type="password" variant="outlined" label="New Password" fullWidth value={user.password} onChange={handleChange}/>
                <TextField required name="rePassword" type="password" variant="outlined" label="Confirm New Password" fullWidth value={user.rePassword} onChange={handleChange}/>
                { 
                !serverOtp ?<>
                 <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" fullWidth onClick={sendOtp}>Send OTP</Button>
                 <Link className={classes.buttonLink} component="button" underline="none" onClick={() => history.push("/login")}> Back To Login </Link>
                </>
                : <>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" fullWidth onClick={sendOtp}>Re-Send OTP</Button>
                <TextField name="otp" variant="outlined" label="****" fullWidth value={otp} onChange={handleOtpChange}/>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" fullWidth onClick={register}>Verify</Button>
                </>
                }
                {/* <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" fullWidth onClick={register}>Send Otp</Button>
                <Link className={classes.buttonLink} component="button" underline="none" onClick={() => history.push("/login")}> Back To Login </Link> */}
                
            </form>
        </Paper>
        </>
    )
}

export default ForgotPassword ;