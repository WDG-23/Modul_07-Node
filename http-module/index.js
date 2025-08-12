import http from 'node:http';

const myObject = {
  favouriteIceCream: 'chocolate',
  randomNumber: 123,
  someArray: ['hallo', 9, true],
};

const fakeDataBase = [myObject];

const recipes = [
  { id: 1, title: 'Fischstäbchen' },
  { id: 2, title: 'Kartoffelpuffer' },
];

const getRecipes = (response) => {
  response.statusCode = 200; // GET /recipes
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify(recipes));
  return;
};

const server = http.createServer(async (request, response) => {
  console.log(request.url);

  if (request.method === 'GET') {
    if (request.url === '/recipes') {
      getRecipes(response);
    } else {
      response.statusCode = 200; // GET /
      response.setHeader('Content-Type', 'application/json');
      response.end(JSON.stringify(fakeDataBase));
    }
  } else if (request.method === 'POST') {
    const chunks = [];
    for await (const chunk of request) {
      chunks.push(chunk);
    }
    const body = JSON.parse(Buffer.concat(chunks).toString());

    if (request.url === '/recipes') {
      // POST /recipes
      recipes.push({ id: recipes.length + 1, title: body.title });
      response.statusCode = 201;
      response.end();
    } else {
      // POST /
      fakeDataBase.push('Neuer Eintrag');
      response.statusCode = 201;
      response.end();
    }
  }
});

// const server = http.createServer((request, response) => {
//   const date = new Date().toLocaleDateString();
//   response.statusCode = 200;
//   response.setHeader('Content-Type', 'text/html');
//   response.end(`
// <!DOCTYPE html>
// <html lang="en">

//   <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <script>console.log("Ich laufe im Browser")</script>
//     <style>h1{color:blue;} </style>
//     <title>My Node Website</title>
//   </head>

//   <body>
//     <h1>Welcome to Node.js</h1>
//     <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/500px-Node.js_logo.svg.png" alt="">
//     <p>${date}</p>
//   </body>

// </html>`);
// });

server.listen(3000, () => console.log('Server läuft auf port 3000'));
