import React, { useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import moment from 'moment';

import {
  makeStyles,
  Typography,
  Button
} from '@material-ui/core';

import { useAppDispatch, useTypedSelector } from '../redux/store';
import { actions as residentActions, Attendance, Resident, selectAllResidents } from '../services/residentsService';

import ModalAttendProgram from '../components/ModalAttendProgram';
import ModalCreateResident from '../components/ModalCreateResident';

const columns = [
  {
    name: 'name',
    label: 'Name',
    options: {
      filter: false,
      sort: false
    }
  },
  {
    name: 'status',
    label: 'Status',
    options: {
      filter: true,
      sort: false
    }
  },
  {
    name: 'room',
    label: 'Room',
    options: {
      filter: true,
      sort: false
    }
  },
  {
    name: 'levelOfCare',
    label: 'Level of Care',
    options: {
      filter: true,
      sort: false
    }
  },
  {
    name: 'ambulation',
    label: 'Ambulation',
    options: {
      filter: true,
      sort: false
    }
  },
  {
    name: 'birthDate',
    label: 'Birth Date',
    options: {
      filter: false,
      sort: false
    }
  },
  {
    name: 'moveInDate',
    label: 'Move in Date',
    options: {
      filter: false,
      sort: false
    }
  },
  {
    name: 'applicantId',
    label: 'Applicant ID',
    options: {
      filter: false,
      sort: false
    }
  },
  {
    name: 'attendance',
    label: 'Attendance (Program ID-Status)',
    options: {
      filter: false,
      sort: false
    }
  },
  {
    name: 'attendProgramBtn',
    label: ' ',
    options: {
      filter: false,
      sort: false
    }
  }
];

const useStyles = makeStyles((theme) => ({
  createResidentButton: {
    margin: theme.spacing(1, 0, 4),
    backgroundColor: '#00ADD8'
  },
  attendProgramButton: {
    margin: theme.spacing(1, 0, 1),
    backgroundColor: '#00ADD8'
  },
  createResidentButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: '16px'
  }
}));

const ResidentsContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { createResidentButton, attendProgramButton, createResidentButtonText } = useStyles();
  const [modalCreateResidentOpen, setModalCreateResidentOpen] = React.useState(false);
  const [modalAttendProgramOpen, setModalAttendProgramOpen] = React.useState(false);
  const [residentID, setResidentID] = React.useState('');

  const residents = useTypedSelector(selectAllResidents);

  useEffect(() => {
    const promise = dispatch(residentActions.get());
    return () => {
      promise.abort();
    };
  }, []);

  return (
    <div>
      <Button className={createResidentButton} onClick={() => { setModalCreateResidentOpen(true); }}>
        <Typography className={createResidentButtonText}>
          New Resident
        </Typography>
      </Button>
      <ModalAttendProgram id={residentID} open={modalAttendProgramOpen} handleClose={() => { setModalAttendProgramOpen(false); }} />
      <ModalCreateResident open={modalCreateResidentOpen} handleClose={() => { setModalCreateResidentOpen(false); }} />
      <MUIDataTable
        options={{ viewColumns: false, print: false, selectableRowsHideCheckboxes: true }}
        title={'Resident List'}
        data={residents.map((resident: Resident) => {
          return {
            id: resident.id,
            name: `${resident.name}${resident.preferredName !== null ? ', ' + resident.preferredName : ''}`,
            status: resident.status,
            room: resident.room !== '' ? resident.room : 'N/A',
            levelOfCare: resident.levelOfCare,
            ambulation: resident.ambulation,
            birthDate: moment(resident.birthDate).format('MMMM Do YYYY, h:mm:ss a'),
            moveInDate: moment(resident.moveInDate).format('MMMM Do YYYY, h:mm:ss a'),
            applicantId: resident.applicantId ?? 'N/A',
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            attendance: resident?.attendance?.length ? resident?.attendance.map((program: Attendance) => `${program.programId}-${program.status}`).join(', ') : '',
            attendProgramBtn:
            <Button className={attendProgramButton} onClick={() => { setResidentID(resident.id ?? ''); setModalAttendProgramOpen(true); }}>
              <Typography className={createResidentButtonText}>
                Attend Program
              </Typography>
            </Button>
          };
        })}
        columns={columns}
      />
    </div>
  );
};

export default ResidentsContainer;
