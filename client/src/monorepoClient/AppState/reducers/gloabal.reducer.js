export const globalObject = {
  filePreview: {
    file: {},
    open: false,
  },
};

export const globalReducer = (state = globalObject, action) => {
  switch (action.type) {
    case "SET_FULLSCREEN_PREVIEW":
      return {
        ...state,
        filePreview: {
          file: action.payload.file,
          open: action.payload.open,
        },
      };
    default:
      return state;
  }
};
