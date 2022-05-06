import React,{useState} from 'react' ;
import { TextField, Button, Typography, Paper, Link } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import "./Register.css" ;
import axios from "axios" ;
import {useHistory} from "react-router-dom"
import useStyles from '../Form/styles';


function Register () {
    let history = useHistory()
    const classes = useStyles();
    const [alert, setAlert] = useState(false);
    const [otp,setOtp] =useState("")
    const [serverOtp,setServerOtp] = useState("")
    const [user , setUser] = useState({
        fName : "",
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
        const {fName,email,password,rePassword}=user

        if(fName && email && password && password===rePassword)
        {
            //setAlert("valid")
            axios.post("http://localhost:5000/register",user)
            .then ( res => {
                {
                    console.log(res.data.message)
                    if (res.data.message)
                    {
                        console.log("hello");
                        // showAlert(res.data.message,"warning")
                        // history.push("/login")
                    }
                    else
                    {
                        setServerOtp(res.data.OTP);
                        // history.push({
                        //     pathname:"/register/otp",
                        //     state:{ otp :res.data.OTP , user : res.data.user}
                        // })
                    }
                }
                
            }).catch(res=>{
                console.log("error in send otp")
            })
        }else{
             // showAlert("Fill up complete form","danger")
            setAlert("Please Fill up complete form");
        }
        
    }

    
    function register ()
    {
        console.log(otp,serverOtp)
        if(otp===serverOtp)
        {
            console.log(user)
            axios.post("http://localhost:5000/register/otp",user)
            .then ( res => {
                    history.push("/login")
                
            }).catch(res=>{
                console.log("register error")
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
                <Typography variant="h6">Register</Typography>
                <TextField required name="fName" variant="outlined" label="Name" fullWidth value={user.fName} onChange={handleChange} />
                <TextField required name="email" variant="outlined" label="Email" fullWidth value={user.email} onChange={handleChange} />
                <TextField required name="password" type="password" variant="outlined" label="Password" fullWidth value={user.password} onChange={handleChange}/>
                <TextField required name="rePassword" type="password" variant="outlined" label="Re-Password" fullWidth value={user.rePassword} onChange={handleChange}/>
                { 
                !serverOtp ?<>
                 <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" fullWidth onClick={sendOtp}>Send OTP</Button>
                 <Link className={classes.buttonLink} component="button" underline="none" onClick={() => history.push("/login")}> Already Registered? </Link>
                </>
                : <>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" fullWidth onClick={sendOtp}>Re-Send OTP</Button>
                <TextField name="otp" variant="outlined" label="****" fullWidth value={otp} onChange={handleOtpChange}/>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" fullWidth onClick={register}>Verify</Button>
                </>
                }
            </form>
        </Paper>
        </>
    )
}

export default Register ;