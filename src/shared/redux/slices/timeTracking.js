import {createSlice} from '@reduxjs/toolkit';
import {handleAsyncRequest} from '@/shared/redux/utils';
import {getRequest, postRequest} from '@/shared/utils/requests';

// ----------------------------------------------------------------------
const defaultState = {
  isLoading: false,
  error: null,
  currentTimeTrack: {},
};

const slice = createSlice({
  name: 'timeTracking',
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

    updateTimeTracking(state, action) {
      state.currentTimeTrack = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

export const actions = slice.actions;

export const fetchTimeTrack = () => async (dispatch, getState) => {
  const state = getState();

  const organizationId = state.organization.selectOrganizationForTracking?.id;
  const employeeId = state.user.employeeIdForTracking;
  const departmentId = state.department.selectDepartmentForTracking?.id;

  if (!organizationId || !employeeId || !departmentId) return;

  const {error, body} = await handleAsyncRequest({
    dispatch,
    actions,
    requestFn: getRequest,
    endpoint: `/time-tracking/organizationId/${organizationId}/employeeId/${employeeId}`,
    toastMessage: {success: {show: false}, error: {show: true}},
  });

  if (!error) dispatch(actions.updateTimeTracking(body.tracking || {}));
};

export const startTracking =
  ({status}) =>
  async (dispatch, getState) => {
    const state = getState();

    const organizationId = state.organization.selectOrganizationForTracking?.id;
    const employeeId = state.user.employeeIdForTracking;
    const departmentId = state.department.selectDepartmentForTracking?.id;

    if (!organizationId || !employeeId || !departmentId) return;

    const payload = {
      organizationId,
      departmentId,
      employeeId,
      status,
    };

    const {error, body} = await handleAsyncRequest({
      dispatch,
      actions,
      requestFn: postRequest,
      endpoint: `/time-tracking`,
      payload,
      toastMessage: {success: {show: true}, error: {show: true}},
    });

    if (error) throw error;

    dispatch(actions.updateTimeTracking(body.tracking));
  };

export const isTimeTrackingLoading = (state) => state.timeTracking.isLoading;
export const getTimeTrackingErrors = (state) => state.timeTracking.error;

export const getCurrentTimeTracking = (state) =>
  state.timeTracking.currentTimeTrack;
