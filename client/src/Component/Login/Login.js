import React,{useState} from 'react' ;
import "./Login.css" ;
import { TextField, Button, Typography, Paper, Link } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import axios from "axios" ;
import { Redirect, useHistory } from "react-router-dom";
import useStyles from '../Form/styles';
import App from '../../App';

function Login () {

    let history = useHistory()
    const classes = useStyles();

    const [user , setUser] = useState({
        email : "",
        password : ""
   })
   const [email , setEmail] = useState("")
   const [alert, setAlert] = useState(null);
   const [message, setMessage] = useState("");
   function handleChange (e)
   {
       const {name , value} = e.target
       
       setUser({
           ...user,
           [name] : value
       })
   }

    function login (props)
    {
        const {email,password}=user

        if(email && password)
        {
            axios.post("http://localhost:5000/login/", user)
            .then ( res => {
                console.log(res.data);
                // alert(res.data.message)
                    if (res.data.user)
                    {
                        setMessage(res.data.message)
                        setAlert(res.data.message)
                        localStorage.setItem('user',JSON.stringify(res.data.user))
                        // ReactDOM.render(Navbar);
                        return <Redirect to="/"/> 
                        // history.push("/")
                    }
                    else
                    {
                        setMessage(res.data.message)
                        setAlert(res.data.message)
                        // history.push("/login")
                    }
                })
        }else{
            setAlert("Please Enter Username and Password!!");
        }

        
    }

    return(
        <>
            {alert ? <Alert icon={false} severity='error'>{alert}</Alert> : <></>}
            
            <Paper className={classes.paper}>
                <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}>
                    <Typography variant="h6">Login</Typography>
                    <TextField required name="email" type="email" variant="outlined" label="Email" fullWidth value={user.email} onChange={handleChange} />
                    <TextField required name="password" type="password" variant="outlined" label="Password" fullWidth value={user.password} onChange={handleChange} />
                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" fullWidth onClick={login}>Login</Button>
                    <Link className={classes.buttonLink} component="button" underline="none" onClick={() => history.push("/register")}> New to Dcoder? </Link>
                </form>
            </Paper>
        </>
       
    )
}

export default Login ;