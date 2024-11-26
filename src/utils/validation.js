const validation = (req) => {
  const arr = [];
  if (!req.body.name) {
    arr.push("name");
  }
  if (!req.body.email) {
    arr.push("email");
  }
  if (!req.body.password) {
    arr.push("password");
  }
  return arr;
};

export default validation;
