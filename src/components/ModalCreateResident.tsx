import React, { useState } from 'react';

import {
  makeStyles,
  Container,
  Typography,
  TextField,
  Button,
  Modal,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@material-ui/core';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { useAppDispatch } from '../redux/store';
import { actions as residentActions, Resident } from '../services/residentsService';
import dayjs from 'dayjs';

interface ModalCreateResidentProps {
  open: boolean;
  handleClose: () => void;
}

const useStyles = makeStyles((theme) => ({
  heading: {
    textAlign: 'center',
    margin: theme.spacing(1, 0, 4)
  },
  createButton: {
    margin: theme.spacing(1, 0, 4),
    backgroundColor: '#00ADD8'
  },
  createButtonText: {
    textAlign: 'center',
    color: '#fff'
  },
  containerStyle: {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: '#fff',
    border: '2px solid #808080',
    borderRadius: '16px'
  }
}));

const defaultResident: Resident = {
  id: undefined,
  name: '',
  firstName: '',
  lastName: '',
  preferredName: '',
  status: 'HERE',
  room: '',
  levelOfCare: 'INDEPENDENT',
  ambulation: 'CANE',
  birthDate: (new Date()).toISOString(),
  moveInDate: (new Date()).toISOString(),
  applicantId: undefined,
  createdAt: undefined,
  updatedAt: undefined,
  attendance: undefined
};

const ModalCreateResident = (props: ModalCreateResidentProps) => {
  const dispatch = useAppDispatch();
  const { heading, createButton, createButtonText, containerStyle } = useStyles();
  const [resident, setResident] = useState<Resident>(defaultResident);

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newResident = Object.assign({}, resident);
    newResident.firstName = e.target.value;
    newResident.name = `${newResident.firstName} ${newResident.lastName}`;
    setResident(newResident);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newResident = Object.assign({}, resident);
    newResident.lastName = e.target.value;
    newResident.name = `${newResident.firstName} ${newResident.lastName}`;
    setResident(newResident);
  };

  const handlePreferredNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newResident = Object.assign({}, resident);
    newResident.preferredName = e.target.value;
    setResident(newResident);
  };

  const handleStatusChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const newResident = Object.assign({}, resident);
    newResident.status = e.target.value as string;
    setResident(newResident);
  };

  const handleRoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newResident = Object.assign({}, resident);
    newResident.room = e.target.value;
    setResident(newResident);
  };

  const handleLevelOfCareChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const newResident = Object.assign({}, resident);
    newResident.levelOfCare = e.target.value as string;
    setResident(newResident);
  };

  const handleAmbulationChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const newResident = Object.assign({}, resident);
    newResident.ambulation = e.target.value as string;
    setResident(newResident);
  };

  const handleBirthDateChange = (value: any) => {
    const newResident = Object.assign({}, resident);
    newResident.birthDate = value.$d.toISOString();
    setResident(newResident);
  };

  const handleMoveInDateChange = (value: any) => {
    const newResident = Object.assign({}, resident);
    newResident.moveInDate = value.$d.toISOString();
    setResident(newResident);
  };

  const handleApplicantIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newResident = Object.assign({}, resident);
    newResident.applicantId = e.target.value;
    setResident(newResident);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = dispatch(residentActions.create(resident)).then((res) => {
      return res;
    });
    console.log(res);
    location.reload();
  };

  return (
    <Modal
      open={props.open}
      onClose={() => { setResident(defaultResident); props.handleClose(); }}
    >
      <Container className={containerStyle} maxWidth="xs">
        <Typography className={heading} variant="h6">
          Create new resident
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <FormControl fullWidth style={{ display: 'flex', flexDirection: 'row' }}>
            <TextField
              variant="outlined"
              label="First Name"
              onChange={handleFirstNameChange}
            />
            <TextField
              variant="outlined"
              label="Last Name"
              onChange={handleLastNameChange}
            />
          </FormControl>
          <div style={{ marginTop: '8px', marginBottom: '8px' }}/>
          <FormControl fullWidth style={{ display: 'flex', flexDirection: 'row' }}>
            <TextField
              variant="outlined"
              label="Preferred Name"
              fullWidth
              onChange={handlePreferredNameChange}
            />
          </FormControl>
          <div style={{ marginTop: '8px', marginBottom: '8px' }}/>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              variant="outlined"
              margin="none"
              value={resident?.status}
              label="Status"
              fullWidth
              onChange={handleStatusChange}
            >
              <MenuItem value={'HERE'}>Here</MenuItem>
              <MenuItem value={'HOSPITAL'}>Hospital</MenuItem>
              <MenuItem value={'LOA'}>LOA</MenuItem>
            </Select>
          </FormControl>
          <div style={{ marginTop: '8px', marginBottom: '8px' }}/>
          <FormControl fullWidth style={{ display: 'flex', flexDirection: 'row' }}>
            <TextField
              variant="outlined"
              label="Room"
              fullWidth
              onChange={handleRoomChange}
            />
          </FormControl>
          <div style={{ marginTop: '8px', marginBottom: '8px' }}/>
          <FormControl fullWidth>
            <InputLabel>Care</InputLabel>
            <Select
              variant="outlined"
              margin="none"
              value={resident?.levelOfCare}
              label="Care"
              fullWidth
              onChange={handleLevelOfCareChange}
            >
              <MenuItem value={'INDEPENDENT'}>Independent</MenuItem>
              <MenuItem value={'MEMORY'}>Memory</MenuItem>
              <MenuItem value={'ASSISTED'}>Assisted</MenuItem>
            </Select>
          </FormControl>
          <div style={{ marginTop: '8px', marginBottom: '8px' }}/>
          <FormControl fullWidth>
            <InputLabel>Ambulation</InputLabel>
            <Select
              variant="outlined"
              margin="none"
              value={resident?.ambulation}
              label="Ambulation"
              fullWidth
              onChange={handleAmbulationChange}
            >
              <MenuItem value={'CANE'}>Cane</MenuItem>
              <MenuItem value={'NOLIMITATIONS'}>No Limitations</MenuItem>
              <MenuItem value={'WALKER'}>Walker</MenuItem>
              <MenuItem value={'WHEELCHAIR'}>Wheel Chair</MenuItem>
            </Select>
          </FormControl>
          <div style={{ marginTop: '8px', marginBottom: '8px' }}/>
          <FormControl fullWidth>
            <DateTimePicker label="Date of Birth" value={dayjs(resident?.birthDate)} onChange={handleBirthDateChange}/>
          </FormControl>
          <div style={{ marginTop: '8px', marginBottom: '8px' }}/>
          <FormControl fullWidth>
            <DateTimePicker label="Move In Date" value={dayjs(resident?.moveInDate)} onChange={handleMoveInDateChange}/>
          </FormControl>
          <div style={{ marginTop: '8px', marginBottom: '8px' }}/>
          <FormControl fullWidth style={{ display: 'flex', flexDirection: 'row' }}>
            <TextField
              variant="outlined"
              label="Applicant ID"
              fullWidth
              onChange={handleApplicantIdChange}
            />
          </FormControl>
          <div style={{ marginTop: '8px', marginBottom: '8px' }}/>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={createButton}
          >
            <Typography className={createButtonText} variant ="h6">
              Create
            </Typography>
          </Button>
        </form>
      </Container>
    </Modal>
  );
};

export default ModalCreateResident;
