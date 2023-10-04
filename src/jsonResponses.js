const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const headForGetUsers = (request, response) => {
  respondJSON(request, response, 200, null);
};

const getForGetUsers = (request, response, usersMap) => {
  const responseJSON = {
    users: usersMap,
  };
  respondJSON(request, response, 200, responseJSON);
};

const headForNotReal = (request, response) => {
  respondJSON(request, response, 404, null);
};

const getForNotReal = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };
  respondJSON(request, response, 404, responseJSON);
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  respondJSON(request, response, 404, responseJSON);
};

const addUser = (request, response, code) => {
  const results = {
    201: {
      message: 'Created Successfully',
      id: 'Created',
    },
    204: {
      message: 'Updated(No Content)',
      id: 'Updated(No Content)',
    },
    400: {
      message: 'Name and age are both required',
      id: 'addUserMissingParams',
    },
  };

  respondJSON(request, response, code, results[code]);
};

module.exports = {
  headForGetUsers,
  getForGetUsers,
  headForNotReal,
  getForNotReal,
  notFound,
  addUser,
};
