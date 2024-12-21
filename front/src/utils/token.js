export const token = () => {
    if (JSON.parse(localStorage.getItem("token"))) {
      var data = JSON.parse(localStorage.getItem("token"));
      return data;
    }
};
  