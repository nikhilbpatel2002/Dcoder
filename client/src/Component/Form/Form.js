import React, { useState } from 'react';
import useStyles from './styles';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { addFoodItem } from '../../actions/foodItems';
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

const Form = () => {
    const [foodItemData, setFoodItemData] = useState({ creator: '', title: '', message: '', tags: '', selectedFiles: '' });
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addFoodItem(foodItemData));
    }

    const clear = () => {
        
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} >
                <Typography variant="h6">Add Food Items</Typography>
                <TextField required name="foodItemName" variant="outlined" label="Food Item Name" fullWidth value={foodItemData.foodItemName} onChange={(e) => setFoodItemData({ ...foodItemData, foodItemName: e.target.value })} />
                <TextField required name="foodCategory" variant="outlined" label="Food Category" fullWidth value={foodItemData.foodCategory} onChange={(e) => setFoodItemData({ ...foodItemData, foodCategory: e.target.value })} />
                <TextField required name="pricePerPerson" variant="outlined" type="number" label="Price" fullWidth value={foodItemData.pricePerPerson} onChange={(e) => setFoodItemData({ ...foodItemData, pricePerPerson: e.target.value })} />
                <TextField required name="foodDeliveryTime" variant="outlined" label="Food Preparing Time" fullWidth value={foodItemData.foodDeliveryTime} onChange={(e) => setFoodItemData({ ...foodItemData, foodDeliveryTime: e.target.value })} />
                <div required className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setFoodItemData({ ...foodItemData, selectedFile: base64 })} /></div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Add Food</Button>
                {/* <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button> */}
            </form>
        </Paper>
    );
}

export default Form;