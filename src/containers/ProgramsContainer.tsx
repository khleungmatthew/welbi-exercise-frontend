import MUIDataTable from 'mui-datatables';
import React, { useEffect } from 'react';
import moment from 'moment';

import {
  makeStyles,
  Typography,
  Button
} from '@material-ui/core';

import { useAppDispatch, useTypedSelector } from '../redux/store';
import { actions as programActions, Program, selectAllPrograms } from '../services/programsService';
import { Attendance } from 'services/residentsService';

import ModalCreateProgram from '../components/ModalCreateProgram';

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
    name: 'location',
    label: 'Location',
    options: {
      filter: false,
      sort: false
    }
  },
  {
    name: 'allDay',
    label: 'All Day?',
    options: {
      filter: false,
      sort: false
    }
  },
  {
    name: 'period',
    label: 'Period',
    options: {
      filter: false,
      sort: false
    }
  },
  {
    name: 'tags',
    label: 'Tags',
    options: {
      filter: false,
      sort: false
    }
  },
  {
    name: 'dimension',
    label: 'Dimension',
    options: {
      filter: false,
      sort: false
    }
  },
  {
    name: 'facilitators',
    label: 'Facilitators',
    options: {
      filter: false,
      sort: false
    }
  },
  {
    name: 'levelOfCare',
    label: 'Level Of Care',
    options: {
      filter: false,
      sort: false
    }
  },
  {
    name: 'hobbies',
    label: 'Hobbies',
    options: {
      filter: false,
      sort: false
    }
  },
  {
    name: 'recurrence',
    label: 'Recurrence',
    options: {
      filter: false,
      sort: false
    }
  },
  {
    name: 'attendance',
    label: 'Attendance (Resident ID-Status)',
    options: {
      filter: false,
      sort: false
    }
  }
];

const useStyles = makeStyles((theme) => ({
  createProgramButton: {
    margin: theme.spacing(1, 0, 4),
    backgroundColor: '#00ADD8'
  },
  createProgramButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: '16px'
  }
}));

const ProgramsContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { createProgramButton, createProgramButtonText } = useStyles();
  const [modalCreateProgramOpen, setModalCreateProgramOpen] = React.useState(false);

  const programs = useTypedSelector(selectAllPrograms);

  useEffect(() => {
    const promise = dispatch(programActions.get());
    return () => {
      promise.abort();
    };
  }, []);

  return (
    <div>
      <Button className={createProgramButton} onClick={() => { setModalCreateProgramOpen(true); }}>
        <Typography className={createProgramButtonText}>
          New Program
        </Typography>
      </Button>
      <ModalCreateProgram open={modalCreateProgramOpen} handleClose={() => { setModalCreateProgramOpen(false); }} />
      <MUIDataTable
        options={{ viewColumns: false, print: false, selectableRowsHideCheckboxes: true }}
        title={'Program List'}
        data={programs.map((program: Program) => {
          return {
            id: program.id,
            name: program.name,
            location: program.location,
            allDay: program.allDay ? 'Yes' : 'No',
            period: `From ${moment(program.start).format('MMMM Do YYYY, h:mm:ss a')} to ${moment(program.end).format('MMMM Do YYYY, h:mm:ss a')}`,
            tags: typeof program.tags !== 'string' ? program.tags.join(', ') : program.tags,
            dimension: program.dimension,
            facilitators: typeof program.facilitators !== 'string' ? program.facilitators.join(', ') : program.facilitators,
            levelOfCare: typeof program.levelOfCare !== 'string' ? program.levelOfCare.join(', ') : program.levelOfCare,
            hobbies: typeof program.hobbies !== 'string' ? program.hobbies.join(', ') : program.hobbies,
            recurrence: program.isRepeated
              ? 'Yes'
              : 'No',
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            attendance: program?.attendance?.length ? program.attendance.map((attendance: Attendance) => `${attendance.residentId}-${attendance.status}`).join(', ') : ''
          };
        })}
        columns={columns}
      />
    </div>
  );
};

export default ProgramsContainer;
