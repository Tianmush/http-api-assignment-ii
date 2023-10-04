const http = require('http');
const url = require('url');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const usersMap = {};
const urlStruct = {
  HEAD: {
    '/getUsers': jsonHandler.headForGetUsers,
    '/notReal': jsonHandler.headForNotReal,
    notFound: jsonHandler.notFound,
  },
  GET: {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    '/getUsers': jsonHandler.getForGetUsers,
    '/notReal': jsonHandler.getForNotReal,
    notFound: jsonHandler.notFound,
  },
  POST: {
    '/addUser': jsonHandler.addUser,
    notFound: jsonHandler.notFound,
  },
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  if (request.method === 'HEAD') {
    if (urlStruct.HEAD[parsedUrl.pathname]) {
      return urlStruct.HEAD[parsedUrl.pathname](request, response);
    }
    return urlStruct.HEAD[parsedUrl.pathname](request, response);
  }
  if (request.method === 'GET') {
    if (urlStruct.GET[parsedUrl.pathname]) {
      return urlStruct.GET[parsedUrl.pathname](request, response, usersMap);
    }
    return urlStruct.GET.notFound(request, response);
  }
  if (request.method === 'POST') {
    if (parsedUrl.pathname === '/addUser') {
      let requestBody = '';

      request.on('data', (chunk) => {
        requestBody += chunk.toString();
      });

      request.on('end', () => {
        try {
          const body = JSON.parse(requestBody);
          if (body.name === '' || body.age === '') {
            return urlStruct.POST['/addUser'](request, response, 400);
          }

          if (usersMap[body.name] === undefined) {
            usersMap[body.name] = {
              name: body.name,
              age: body.age,
            };

            return urlStruct.POST['/addUser'](request, response, 201);
          }

          if (usersMap[body.name] !== undefined) {
            usersMap[body.name] = {
              name: body.name,
              age: body.age,
            };

            return urlStruct.POST['/addUser'](request, response, 204);
          }
        } catch (error) {
          return urlStruct.POST['/addUser'](request, response, 400);
        }
      });
    } else {
      return urlStruct.GET.notFound(request, response);
    }
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on http://127.0.0.1:${port}`);
});
