import { createSlice } from "@reduxjs/toolkit";

const initialState = {

  formData: {

    hcp_name: "",
    date: "",
    time: "",
    interaction_type: "",
    attendees: "",
    topics: "",
    sentiment: "",
    product: "",
    summary: "",
    follow_up: "",
    brochure_shared: false,
    materials_shared: "",
    samples_distributed: "",
    suggested_followups: []

  },

  recentInteractions: []

};

const crmSlice = createSlice({

  name: "crm",

  initialState,

  reducers: {

    updateForm: (state, action) => {

      state.formData = {
        ...state.formData,
        ...action.payload
      };
    },

    addRecentInteraction: (
      state,
      action
    ) => {

      state.recentInteractions.unshift(
        action.payload
      );
    }

  }

});

export const {

  updateForm,
  addRecentInteraction

} = crmSlice.actions;

export default crmSlice.reducer;