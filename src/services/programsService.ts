import createRestService from '../utils/restServiceGenerator';
import { RootState } from '../redux/store';
import { Attendance } from './residentsService';

export interface Program {
  id: string | null | undefined;
  parentId: string | null | undefined;
  name: string;
  location: string;
  allDay: boolean;
  start: string;
  end: string;
  tags: string[];
  createdAt: string | null | undefined;
  updatedAt: string | null | undefined;
  dimension: string;
  facilitators: string[];
  levelOfCare: string[];
  hobbies: string[];
  recurrence: Object | null | undefined;
  isRepeated: boolean;
  applicantId: string | null | undefined;
  attendance: Attendance[] | null | undefined;
}

const { reducer, adapter, actions } = createRestService<Program>('programs');

export const {
  selectById: selectProgramById,
  selectIds: selectProgramIds,
  selectEntities: selectProgramEntities,
  selectAll: selectAllPrograms,
  selectTotal: selectTotalPrograms
} = adapter.getSelectors((state: RootState) => state.programs);

export { reducer, actions, adapter };
