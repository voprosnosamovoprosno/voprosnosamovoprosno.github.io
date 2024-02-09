/**
 * This is the main server script that provides the API endpoints
 *
 * Uses sqlite.js to connect to db
 */
const path = require("path");

const fastify = require("fastify")({
  // Set this to true for detailed logging:
  logger: false
});

// Setup our static files
fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "public"),
  prefix: "/", // optional: default '/'
});
  
fastify.register(require("@fastify/formbody"));

// point-of-view is a templating manager for fastify
fastify.register(require("@fastify/view"), {
  engine: {
    handlebars: require("handlebars"),
  },
});

const db = require("./sqlite.js");
const errorMessage =
  "Whoops! Error connecting to the database–please try again!";

// OnRoute hook to list endpoints
const routes = { endpoints: [] };
fastify.addHook("onRoute", routeOptions => {
  routes.endpoints.push(routeOptions.method + " " + routeOptions.path);
});

fastify.get("/", (request, reply) => {
  return reply.view('voprosnosamovoprosno.html');
});

var vssgml=null;

async function vssmsf()
   {let vssbvl=false;
    vssgml = await db.getMessages();
    console.log('?vssgml.length'+vssgml.length+'?');
    for(let vssj=0;vssj<vssgml.length;vssj++)
      {if(vssj<vssgml.length-12)
        {vssdml=await db.deleteMessage(vssgml[vssj].id);
         vssbvl=true;
         console.log('?vssdelmesid'+vssgml[vssj].id+vssdml+'?');
        }else{if(vssgml[vssj].message[0]!='?')
               {vssdml=await db.deleteMessage(vssgml[vssj].id);
                vssbvl=true;
                console.log('?vssdelarrmesid'+vssgml[vssj].id+vssdml+'?');
               }
             }
      }   
    if(vssbvl==true)
     {vssgml = await db.getMessages();
      console.log('?vssmsgsqnt'+vssgml.length+'?');
     }
  }

fastify.post("/", async (request, reply) => {
  console.log('?'+request.body+'?');
  if(vssgml==null){await vssmsf();}
  let vssindxvl=request.body*1;
  if(vssindxvl>=vssgml.length)
    {vssindxvl=vssindxvl-(vssindxvl-vssgml.length+1);
     console.log('?vssindxvl'+vssindxvl+'?');
    }
  if(vssindxvl>=0)
  {return vssgml[vssindxvl].message;}  
});

fastify.post("/vssadd", async (request, reply) => {
  let vssaml = await db.addMessage(request.body);
  console.log('?vssaddmessage'+vssaml+'?');
  console.log(request.body);
  vssmsf();
});

fastify.get("/vssxs", async (request, reply) => {
  console.log('?vssxs?');
});

// Update text for an message (auth)
fastify.put("/message", async (request, reply) => { 
  console.log(request.body);
  return replay.view('voprosnosamovoprosno9.html');
  /*let data = {};
  const auth = authorized(request.headers.admin_key);
  if(!auth || !request.body || !request.body.id || !request.body.message) data.success = false;
  else data.success = await db.updateMessage(request.body.id, request.body.message); 
  const status = data.success ? 201 : auth ? 400 : 401;
  reply.status(status).send(data);
  */
});

// Delete a message (auth)
fastify.delete("/message", async (request, reply) => {
  let data = {};
  const auth = authorized(request.headers.admin_key);
  if(!auth || !request.query || !request.query.id) data.success = false;
  else data.success = await db.deleteMessage(request.query.id);
  const status = data.success ? 201 : auth ? 400 : 401;
  reply.status(status).send(data);
});

const vsskvn='vsskvv';
// Helper function to authenticate the user key
const authorized = key => {
  if (
    !key ||
    key < 1 ||
    !process.env.ADMIN_KEY ||
    key !== process.env.ADMIN_KEY
  )
    return false;
  else return true;
};

// Run the server and report out to the logs
fastify.listen({port:process.env.PORT, host:'0.0.0.0'}, function(err, address) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`?vss${address}?`);
});
