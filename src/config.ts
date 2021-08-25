const develop = {
  BACKEND_SERVICE: '',
};

const local = {
  BACKEND_SERVICE: 'http://localhost:5000/api/v1',
};

const prod = {
  BACKEND_SERVICE: '',
};

const choose = {
  develop,
  local,
  prod,
};

const config = process.env.REACT_APP_STAGE ? choose[process.env.REACT_APP_STAGE] : choose['prod'];

export default config;
