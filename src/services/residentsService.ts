import createRestService from '../utils/restServiceGenerator';
import { RootState } from '../redux/store';

export interface Attendance {programId: number; residentId: number; status: string}

export interface Resident {
  id: string | null | undefined;
  name: string;
  firstName: string;
  lastName: string;
  preferredName: string | null;
  status: string;
  room: string;
  levelOfCare: string;
  ambulation: string;
  birthDate: string;
  moveInDate: string;
  createdAt: string | null | undefined;
  updatedAt: string | null | undefined;
  applicantId: string | null | undefined;
  attendance: Attendance[] | null | undefined;
}

const { reducer, adapter, actions } = createRestService<Resident>('residents');

export const {
  selectById: selectResidentById,
  selectIds: selectResidentIds,
  selectEntities: selectResidentEntities,
  selectAll: selectAllResidents,
  selectTotal: selectTotalResidents
} = adapter.getSelectors((state: RootState) => state.residents);

export { reducer, actions, adapter };
