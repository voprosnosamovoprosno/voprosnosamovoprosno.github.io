const path = require("path");
const fs=require('fs');

// Require the fastify framework and instantiate it
const fastify = require("fastify")({
  // set this to true for detailed logging:
  logger: false,
});

// Setup our static files
fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "public"),
  prefix: "/", // optional: default '/'
});

// fastify-formbody lets us parse incoming forms
fastify.register(require("@fastify/formbody"));

// point-of-view is a templating manager for fastify
fastify.register(require("@fastify/view"), {
  engine: {
    handlebars: require("handlebars"),
  },
});

// Our main GET home page route, pulls from src/pages/index.hbs
fastify.get("/", function (request, reply) {
  
  // params is an object we'll pass to our handlebars template
  let params = {
    vssp:'??'
  };
  
  // request.query.paramName <-- a querystring example
  //return reply.view("/src/pages/index.hbs", params);
  
  return reply.view('voprosnosamovoprosno.html', params);

});
var vssv=0;
// A POST route to handle form submissions
fastify.post("/", function (request, reply) {
  
  console.log(request.body);
  
  if(request.body=='?вопросносамовопросно?');
  {try {
	  var vssrnv = fs.readFileSync(vssv+'.txt','utf8'); 
	  vssv=vssv+1;
    console.log('?'+vssv+'.txt'+'?');
     } catch (err) {
	           console.log(err);
             vssv=0;}
    return vssrnv;
  }

  try {
	    var vsscfv = fs.readFileSync('vss13.txt','utf8'); 
	    console.log('?vss13.txt?'+'?'+vsscfv+'?');
     } catch(err){
	          console.log(err);
            vsscfv='0';}
  
  try {
	let vsswl = fs.writeFileSync(vsscfv+'.txt',request.body); 
	console.log('?'+vsscfv+'.txt'+'?');
     } catch (err) {
	console.log(err);}
  
  try {
	  var vssrv = fs.readFileSync(vsscfv+'.txt','utf8'); 
	  console.log(vssrv);
     } catch (err) {
	  console.log(err);}
  
  vsscfv=vsscfv*1+1;
  if(vsscfv>12){vsscfv=0;}
  
  try {
	    let vsswl = fs.writeFileSync('vss13.txt',''+vsscfv); 
	    console.log('?vss13.txt?'+'?'+vsscfv+'?');
     } catch(err){
	          console.log(err);}
  
  // request.body.paramName <-- a form post example
  // return reply.view("/src/pages/index.hbs", params);
     return vssrv;
  });

// Run the server and report out to the logs
fastify.listen(
  { port: process.env.PORT, host: "0.0.0.0" },
  function (err, address) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Your app is listening on ${address}`);
  }
);
