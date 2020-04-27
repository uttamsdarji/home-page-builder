import allTemplatesData from '../../components/routes/AllTemplates/allTemplatesData';

const initialState = {
  templates: allTemplatesData
}

const allTemplatesReducer = (state = initialState, action) => {
  switch(action.type) {
    default: 
      return state
  }
}

export default allTemplatesReducer;