export const authenticateObject = localStorage.getItem("userData") || {};

export const authenticateReducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      const {
        user: { name, id, email, imageUrl, haveForm },
      } = action.payload;

      const newUsers = { id, email, name, imageUrl, haveForm };

      localStorage.setItem("userData", JSON.stringify(newUsers));

      const updatedUserData = localStorage.getItem("userData");

      state = updatedUserData;
      return state;
    case "SUBMIT_FORM":
      const updatedUser = {
        id: action.payload._id,
        email: action.payload.email,
        name: action.payload.name,
        imageUrl: action.payload.imageUrl,
        haveForm: action.payload.haveForm,
      };

      localStorage.setItem("userData", JSON.stringify(updatedUser));

      const newUpdatedUserData = localStorage.getItem("userData");

      state = newUpdatedUserData;
      return state;
    case "CLEAR_USER":
      localStorage.removeItem("userData");

      return state;

    default:
      return state;
  }
};
