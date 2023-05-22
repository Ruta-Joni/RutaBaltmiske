import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux'

const AddElement=({ buttonName, formToAdd })=> {

    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    return (
        <>
        <Box sx={{ py: 2, display: "flex", justifyContent: "right" }}>
           <Button  onClick={handleClickOpen} variant='contained' color="success">{buttonName} </Button> 
        </Box>
         
            <Box >
                <Dialog open={open}>
                    <Box sx={{display:'flex'}}>
                        <DialogTitle sx={{pb:2}}>{buttonName}</DialogTitle>
                         <Button onClick={handleClose} sx={{ position: 'absolute', top: 15, right: 0 }}>x</Button>
                    </Box>
                <DialogContent>
                    {formToAdd}
                </DialogContent>
            </Dialog>
            </Box>
        </>
    );
}
export default AddElement