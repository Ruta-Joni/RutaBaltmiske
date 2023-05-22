import {Box } from '@mui/material'
import React, { useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector} from 'react-redux'
import { userSignUpAction, userSignInAction } from '../redux/actions/userAction'
import { useNavigate } from 'react-router-dom'

const style= {my: 2,
"& .MuiInputBase-root": {
    color: 'text.secondary',
},
fieldset: { borderColor: "rgb(231, 235, 240)" }}


const validationSchema = yup.object({
    firstName: yup
        .string('Įveskite vardą')
        .min(3, 'Vardą turi sudaryti bent 3 ženklai'),
    lastName: yup
        .string('Įveskite pavardę')
        .min(3, 'Pavardę turi sudaryti bent 3 ženklai'),
    email: yup
        .string('Įveskite el.paštą')
        .email('Neteisingas el.pašto formatas'),
    password: yup
        .string('Įveskite slaptažodį')
        .min(8, 'Slaptažodį turi sudaryti bent 8 ženklai')
});

const UserForm = ({paskirtis}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, userInfo } = useSelector(state => state.signIn);
    useEffect(() => {

        if (isAuthenticated) {
            if (userInfo.role === 1) {
                navigate('/admin/dashboard');
            } else {
                navigate('/user/dashboard');
            }
        }

    }, [isAuthenticated])
    const tipas={paskirtis};
   
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            if(tipas.paskirtis=="Registruotis"||tipas.paskirtis=="Pridėti"){
            dispatch(userSignUpAction(values));   
            }
            else if(tipas.paskirtis=="Prisijungti"){
            dispatch(userSignInAction(values));  
            }
            actions.resetForm();
        }

    })
    return (
        <>
                <Box onSubmit={formik.handleSubmit} component="form">
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "400px" }}>
                        {tipas.paskirtis=="Prisijungti" ?
                        <></>:
                        <>
                        <TextField
                            sx={style}
                            fullWidth
                            id="firstName"
                            label="Vardas"
                            name='firstName'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Vardas"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                        />
                        <TextField
                            sx={style}
                            fullWidth
                            id="lastName"
                            label="Pavardė"
                            name='lastName'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Pavardė"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                        /></>}
                        <TextField
                            sx={style}
                            fullWidth
                            id="email"
                            label="El.paštas"
                            name='email'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="El.paštas"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            sx={style}
                            fullWidth
                            id="password"
                            name="password"
                            label="Slaptažodis"
                            type="password"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Slaptažodis"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />

                        <Button fullWidth variant="contained" type='submit' >{paskirtis}</Button>
                    </Box>
                </Box>
        </>
    )
}

export default UserForm