// imports
const Koa = require('koa');
const KoaRouter = require('koa-router');
const BodyParser = require('koa-bodyparser');

// middleware
const port = 3000;
const app = new Koa();
const router = new KoaRouter();
app.use(BodyParser());

//database
var data = [
    {"id" : 1, "name" : "John"},
    {"id" : 2, "name" : "Ann"}
]

// routes
router.get('/', read);
router.post('/post', add);
router.put('/update', update);
router.delete('/delete', remove);

// read function
async function read(ctx) {
    ctx.body = data;
}

// insert function
async function add(ctx) {
    var user = ctx.request.body;
    data.push(user);
    ctx.body = "New user added"
}

// update function
async function update(ctx) {
    let user = ctx.request.body;
    const index = data.findIndex((e) => e.id === user.id)
    let msg;
    if(index === -1) {
        data.push(user);
        msg= "New user added"
    } else {
        data[index] = user;
        msg = "User updated"
    }
    ctx.body = msg;
}

// delete function
async function remove(ctx) {
    let user = ctx.request.body;
    const index = data.findIndex((e) => e.id === user.id)
    let msg;
    if(index === -1) {
        msg= "There is no such user"
    } else {
        delete data[index];
        msg = "User deleted"
    }
    ctx.body = msg;
}


app.use(router.routes()).use(router.allowedMethods());
app.listen(port, () => console.log('Server running'));