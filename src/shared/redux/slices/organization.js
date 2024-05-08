import {createSlice} from '@reduxjs/toolkit';
import {handleAsyncRequest} from '@/shared/redux/utils';
import {getRequest} from '@/shared/utils/requests';

// ----------------------------------------------------------------------
const defaultState = {
  isLoading: false,
  error: null,
  list: [],
  selectOrganizationForTracking: '',
  currentOrganization: {},
};

const slice = createSlice({
  name: 'organization',
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

    setOrganizationForTracking(state, action) {
      state.selectOrganizationForTracking = action.payload;
    },

    setCurrentOrganization(state, action) {
      state.currentOrganization = action.payload;
    },

    resetState: (state) => {
      const {selectOrganizationForTracking, list} = state;
      Object.assign(state, {
        ...defaultState,
        selectOrganizationForTracking,
        list,
      });
    },
  },
});

// Reducer
export default slice.reducer;

export const actions = slice.actions;

export const fetchOrganizations = () => async (dispatch) => {
  const {error, body} = await handleAsyncRequest({
    dispatch,
    actions,
    requestFn: getRequest,
    endpoint: '/organizations',
    toastMessage: {success: {show: false}, error: {show: true}},
  });

  if (error) throw error;

  dispatch(actions.setList(body.organizations));
};

export const setOrganizationForTracking =
  (organization) => async (dispatch) => {
    await dispatch(actions.setOrganizationForTracking(organization));
  };

export const isOrganizationLoading = (state) => state.organization.isLoading;
export const getOrganizationErrors = (state) => state.organization.error;

export const getOrganizations = (state) => state.organization.list;

export const getOrganizationForTracking = (state) =>
  state.organization.selectOrganizationForTracking;

export const getCurrentOrganization = (state) =>
  state.organization.currentOrganization;
