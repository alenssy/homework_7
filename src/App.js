import { useState, useRef } from 'react';
import './App.css';
import { useEscape } from './hooks/useEscape';
import { useOutsideClick } from './hooks/useOutsideClick';
import { FormGroup, FormControl, InputLabel, Input, Button, Box, Alert } from '@mui/material';
import { useForm } from './hooks/useForm';
import { useSaveFormData } from './hooks/useSaveFormData';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function App() {
  const [open, setOpen] = useState(false)
  const modalRef = useRef(null)

  const handleOpen = () => setOpen(true)

  useOutsideClick(modalRef, () => setOpen(false))
  useEscape(() => setOpen(false))

  const {
    values,
    handleChange,
  } = useSaveFormData(open)

  const {
    errors,
    handleSubmit,
  } = useForm(open, values, () => setOpen(false))


  return (
    <div className="App">
        <Button id="btnOpen" onClick={handleOpen}>Open modal</Button>
        {open && (
          <Box ref={modalRef} sx={style}>
            {Object.keys(errors).length !== 0 && (
              <Alert severity="error">{errors.first_name || errors.last_name || errors.email || errors.password || errors.confirm_password}</Alert>
            )}
            <FormGroup>
              <FormControl sx={{ margin: '20px 0' }}>
                <InputLabel htmlFor="first_name">First name</InputLabel>
                <Input name="first_name" error={errors.first_name && true} onChange={handleChange} value={values.first_name || ''} required/>
              </FormControl>
              <FormControl sx={{ margin: '20px 0' }}>
                <InputLabel htmlFor="last_name">Last name</InputLabel>
                <Input name="last_name" error={errors.last_name && true} onChange={handleChange} value={values.last_name || ''} required/>
              </FormControl>
              <FormControl sx={{ margin: '20px 0' }}>
                <InputLabel htmlFor="email">Email address</InputLabel>
                <Input type="email" name="email" error={errors.email && true} onChange={handleChange} value={values.email || ''} required />
              </FormControl>
              <FormControl sx={{ margin: '20px 0' }}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input type="password" name="password" error={errors.password && true} onChange={handleChange} value={values.password || ''} required />
              </FormControl>
              <FormControl sx={{ margin: '20px 0' }}>
                <InputLabel htmlFor="confirm_password">Confirm password</InputLabel>
                <Input type="password" name="confirm_password" error={errors.confirm_password && true} onChange={handleChange} value={values.confirm_password || ''} required />
              </FormControl>
            </FormGroup>
            <Button onClick={handleSubmit}>Submit</Button>
          </Box>
        )}
    </div>
  );
}

export default App;
