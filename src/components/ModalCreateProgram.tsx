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
  InputLabel,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { useAppDispatch } from '../redux/store';
import { actions as programActions, Program } from '../services/programsService';
import dayjs from 'dayjs';

interface ModalCreateProgramProps {
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

const defaultProgram: Program = {
  id: undefined,
  parentId: undefined,
  name: '',
  location: '',
  allDay: false,
  start: '',
  end: '',
  tags: [],
  createdAt: undefined,
  updatedAt: undefined,
  dimension: '',
  facilitators: [],
  levelOfCare: [],
  hobbies: [],
  recurrence: {},
  isRepeated: false,
  applicantId: undefined,
  attendance: undefined
};

const ModalCreateProgram = (props: ModalCreateProgramProps) => {
  const dispatch = useAppDispatch();
  const { heading, createButton, createButtonText, containerStyle } = useStyles();
  const [program, setProgram] = useState<Program>(defaultProgram);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgram = Object.assign({}, program);
    newProgram.name = e.target.value;
    setProgram(newProgram);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgram = Object.assign({}, program);
    newProgram.location = e.target.value;
    setProgram(newProgram);
  };

  const handleIsAllDayChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const newProgram = Object.assign({}, program);
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    newProgram.allDay = !!(e.target.value as number);
    setProgram(newProgram);
  };

  const handleStartChange = (value: any) => {
    const newProgram = Object.assign({}, program);
    newProgram.start = value.$d.toISOString();
    setProgram(newProgram);
  };

  const handleEndChange = (value: any) => {
    const newProgram = Object.assign({}, program);
    newProgram.end = value.$d.toISOString();
    setProgram(newProgram);
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgram = Object.assign({}, program);
    newProgram.tags = e.target.value.split(',');
    setProgram(newProgram);
  };

  const handleDimensionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgram = Object.assign({}, program);
    newProgram.dimension = e.target.value;
    setProgram(newProgram);
  };

  const handleFacilitatorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgram = Object.assign({}, program);
    newProgram.facilitators = e.target.value.split(',');
    setProgram(newProgram);
  };

  const handleLevelOfCareChange = (isChecked: boolean, value: string) => {
    const newProgram = Object.assign({}, program);
    if (isChecked) {
      newProgram.levelOfCare.push(value);
    } else {
      const index = program.levelOfCare.indexOf(value);
      newProgram.levelOfCare.splice(index, 1);
    }
    setProgram(newProgram);
  };

  const handleHobbiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgram = Object.assign({}, program);
    newProgram.hobbies = e.target.value.split(',');
    setProgram(newProgram);
  };

  const handleIsRepeatedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgram = Object.assign({}, program);
    newProgram.isRepeated = e.target.checked;
    setProgram(newProgram);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = dispatch(programActions.create(program)).then((res) => {
      return res;
    });
    console.log(res);
    location.reload();
  };

  return (
    <Modal
      open={props.open}
      onClose={() => { setProgram(defaultProgram); props.handleClose(); }}
    >
      <Container className={containerStyle} maxWidth="xs">
        <Typography className={heading} variant="h6">
          Create new program
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <FormControl fullWidth style={{ display: 'flex', flexDirection: 'row' }}>
            <TextField
              variant="outlined"
              label="Name"
              fullWidth
              onChange={handleNameChange}
            />
          </FormControl>
          <div style={{ marginTop: '8px', marginBottom: '8px' }}/>
          <FormControl fullWidth style={{ display: 'flex', flexDirection: 'row' }}>
            <TextField
              variant="outlined"
              label="Location"
              fullWidth
              onChange={handleLocationChange}
            />
          </FormControl>
          <div style={{ marginTop: '8px', marginBottom: '8px' }}/>
          <FormControl fullWidth>
            <InputLabel>All Day?</InputLabel>
            <Select
              variant="outlined"
              margin="none"
              value={program?.allDay ? 1 : 0}
              label="Status"
              fullWidth
              onChange={handleIsAllDayChange}
            >
              <MenuItem value={0}>No</MenuItem>
              <MenuItem value={1}>Yes</MenuItem>
            </Select>
          </FormControl>
          <div style={{ marginTop: '8px', marginBottom: '8px' }}/>
          <FormControl fullWidth>
            <DateTimePicker label="Start" value={dayjs(program?.start)} onChange={handleStartChange}/>
          </FormControl>
          <div style={{ marginTop: '8px', marginBottom: '8px' }}/>
          <FormControl fullWidth>
            <DateTimePicker label="End" value={dayjs(program?.end)} onChange={handleEndChange}/>
          </FormControl>
          <div style={{ marginTop: '8px', marginBottom: '8px' }}/>
          <FormControl fullWidth style={{ display: 'flex', flexDirection: 'row' }}>
            <TextField
              variant="outlined"
              label="Tags (use comma to separate)"
              fullWidth
              onChange={handleTagsChange}
            />
          </FormControl>
          <div style={{ marginTop: '8px', marginBottom: '8px' }}/>
          <FormControl fullWidth style={{ display: 'flex', flexDirection: 'row' }}>
            <TextField
              variant="outlined"
              label="Dimension"
              fullWidth
              onChange={handleDimensionChange}
            />
          </FormControl>
          <div style={{ marginTop: '8px', marginBottom: '8px' }}/>
          <FormControl fullWidth style={{ display: 'flex', flexDirection: 'row' }}>
            <TextField
              variant="outlined"
              label="Facilitator (use comma to separate)"
              fullWidth
              onChange={handleFacilitatorChange}
            />
          </FormControl>
          <div style={{ marginTop: '8px', marginBottom: '8px' }}/>
          <FormControlLabel label="Independent" control={<Checkbox checked={program?.levelOfCare.includes('INDEPENDENT')} onChange={(e) => { handleLevelOfCareChange(e.target.checked, 'INDEPENDENT'); }}/>}/>
          <FormControlLabel label="Memory" control={<Checkbox checked={program?.levelOfCare.includes('MEMORY')} onChange={(e) => { handleLevelOfCareChange(e.target.checked, 'MEMORY'); }}/>}/>
          <FormControlLabel label="Assisted" control={<Checkbox checked={program?.levelOfCare.includes('ASSISTED')} onChange={(e) => { handleLevelOfCareChange(e.target.checked, 'ASSISTED'); }}/>}/>
          <div style={{ marginTop: '8px', marginBottom: '8px' }}/>
          <FormControl fullWidth style={{ display: 'flex', flexDirection: 'row' }}>
            <TextField
              variant="outlined"
              label="Hobbies (use comma to separate)"
              fullWidth
              onChange={handleHobbiesChange}
            />
          </FormControl>
          <FormControlLabel label="Repeated" control={<Checkbox checked={program?.isRepeated} onChange={(e) => handleIsRepeatedChange(e)}/>}/>
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

export default ModalCreateProgram;
