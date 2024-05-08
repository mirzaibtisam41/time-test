import {createSlice} from '@reduxjs/toolkit';
import {handleAsyncRequest} from '@/shared/redux/utils';
import {getRequest} from '@/shared/utils/requests';

// ----------------------------------------------------------------------
const defaultState = {
  isLoading: false,
  error: null,
  list: [],
  selectDepartmentForTracking: '',
};

const slice = createSlice({
  name: 'department',
  initialState: defaultState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    stopLoading(state) {
      state.isLoading = false;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    setList(state, action) {
      state.list = action.payload;
    },

    setDepartmentForTracking(state, action) {
      state.selectDepartmentForTracking = action.payload;
    },

    resetState: (state) => {
      const {selectDepartmentForTracking, list} = state;
      Object.assign(state, {
        ...defaultState,
        selectDepartmentForTracking,
        list,
      });
    },
  },
});

// Reducer
export default slice.reducer;

export const actions = slice.actions;

export const fetchDepartments = () => async (dispatch) => {
  const {error, body} = await handleAsyncRequest({
    dispatch,
    actions,
    requestFn: getRequest,
    endpoint: '/departments',
    toastMessage: {success: {show: false}, error: {show: true}},
  });

  if (error) throw error;

  dispatch(actions.setList(body.departments));
};

export const setDepartmentForTracking = (department) => async (dispatch) => {
  await dispatch(actions.setDepartmentForTracking(department));
};

export const isDepartmentLoading = (state) => state.department.isLoading;
export const getDepartmentErrors = (state) => state.department.error;

export const getDepartments = (state) => state.department.list;

export const getDepartmentForTracking = (state) =>
  state.department.selectDepartmentForTracking;
