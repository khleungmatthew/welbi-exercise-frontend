import React, { useEffect, useState } from 'react';

import {
  makeStyles,
  Container,
  Typography,
  Button,
  Modal,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@material-ui/core';

import * as Api from '../api';
import { useAppDispatch, useTypedSelector } from '../redux/store';
import { Attendance, selectResidentById } from '../services/residentsService';
import { actions as programActions, Program, selectAllPrograms } from '../services/programsService';

interface ModalAttendProgramProps {
  id: string;
  open: boolean;
  handleClose: () => void;
}

const useStyles = makeStyles((theme) => ({
  heading: {
    textAlign: 'center',
    margin: theme.spacing(1, 0, 4)
  },
  attendButton: {
    margin: theme.spacing(1, 0, 4),
    backgroundColor: '#00ADD8'
  },
  attendButtonText: {
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

interface AttendProgramInput {
  residentId: string | number;
  status: string;
}

const ModalAttendProgram = (props: ModalAttendProgramProps) => {
  const dispatch = useAppDispatch();
  const { heading, attendButton, attendButtonText, containerStyle } = useStyles();
  const [programID, setProgramID] = useState<string>('');

  const programs = useTypedSelector(selectAllPrograms);
  const resident = useTypedSelector((state) => selectResidentById(state, props.id));

  useEffect(() => {
    const promise = dispatch(programActions.get());
    return () => {
      promise.abort();
    };
  }, []);

  const renderMenuItem = () => {
    const attendence = resident?.attendance?.map((program: Attendance) => program.programId as unknown);
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const items = programs.filter((program: Program) => !attendence?.includes(program.id ?? '')).map((program: Program) => <MenuItem key={program.id ?? ''} value={program.id ?? ''}>{program.name}</MenuItem>);
    return items;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const attendProgramInput: AttendProgramInput = { residentId: props.id, status: 'Active' };
    await Api.post(`programs/${programID}/attend`, attendProgramInput).then((_res: unknown) => {
      location.reload();
    });
  };

  return (
    <Modal
      open={props.open}
      onClose={() => { props.handleClose(); }}
    >
      <Container className={containerStyle} maxWidth="xs">
        <Typography className={heading} variant="h6">
          Attend Program: {props.id}
        </Typography>
        <FormControl fullWidth>
          <InputLabel>Program</InputLabel>
          <Select
            variant="outlined"
            margin="none"
            value={programID}
            label="Ambulation"
            fullWidth
            onChange={(e) => { setProgramID((e.target.value as string)); }}
          >
            {renderMenuItem()}
          </Select>
        </FormControl>
        <form onSubmit={handleSubmit} noValidate>
          <div style={{ marginTop: '8px', marginBottom: '8px' }}/>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={attendButton}
          >
            <Typography className={attendButtonText} variant ="h6">
              Attend
            </Typography>
          </Button>
        </form>
      </Container>
    </Modal>
  );
};

export default ModalAttendProgram;
