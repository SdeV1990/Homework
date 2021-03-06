import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { signin, signup } from '../../actions/auth'
import useStyles from './styles'

// Material UI
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

// Components
import Input from './Input'

// State of form on the begining
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

const SignUp = () => {

    // States
    const [form, setForm] = useState(initialState)
    const [isSignup, setIsSignup] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    
    const dispatch = useDispatch()
    const history = useHistory()
    const classes = useStyles()
    
    // Switch pasport view
    const handleShowPassword = () => setShowPassword(!showPassword)

    // Switching between signUp and SignIn modes
    const switchMode = () => {
        setForm(initialState)
        setIsSignup((prevIsSignup) => !prevIsSignup)
        setShowPassword(false)
    };

    // Submittion
    const handleSubmit = (e) => {
        e.preventDefault()

        if (isSignup) {
            dispatch(signup(form, history))
        } else {
            dispatch(signin(form, history))
        }
    };

    // On input values changing
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    return (
        <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    { isSignup && (
                        <>
                            <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                            <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                        </>
                    )}
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                    { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    { isSignup ? 'Sign Up' : 'Sign In' }
                </Button>
                <Grid container justify="flex-end">
                    <Grid item>
                    <Button onClick={switchMode}>
                        { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                    </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
        </Container>
    )
}

export default SignUp;
