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

    function register ()
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
                        showAlert(res.data.message,"warning")
                        history.push("/forgotPassword")
                    }
                    else
                    {
                        history.push({
                            pathname:"/register/otp",
                            state:{ otp :res.data.OTP , user : res.data.user}
                        })
                    }
                }
                
            })
        }else{
            // showAlert("Fill up complete form","danger")
            setAlert(true);
        }
        
    }
    return(
        <>
        {alert ? <Alert icon={false} severity='error'>Please Fill the Form!!</Alert> : "" }
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}>
                <Typography variant="h6">Forgot Password</Typography>
                <TextField required name="email" variant="outlined" label="Email" fullWidth value={user.email} onChange={handleChange} />
                <TextField required name="password" type="password" variant="outlined" label="New Password" fullWidth value={user.password} onChange={handleChange}/>
                <TextField required name="rePassword" type="password" variant="outlined" label="New Password, Again" fullWidth value={user.rePassword} onChange={handleChange}/>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" fullWidth onClick={register}>Send Otp</Button>
                <Link className={classes.buttonLink} component="button" underline="none" onClick={() => history.push("/login")}> Back To Login </Link>
                
            </form>
        </Paper>
        </>
    )
}

export default ForgotPassword ;