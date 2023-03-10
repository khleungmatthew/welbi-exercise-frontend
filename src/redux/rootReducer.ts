import { combineReducers } from '@reduxjs/toolkit';
import { reducer as programsReducer } from '../services/programsService';
import { reducer as residentsReducer } from '../services/residentsService';

const rootReducer = () =>
  combineReducers({
    programs: programsReducer,
    residents: residentsReducer
  });

export default rootReducer;
