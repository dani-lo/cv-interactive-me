import { 
oakCors,
    oak_Application, 
    oak_FlashServer,
    oak_Router,
    oak_hasFlash
  } from './deps.ts'

  import userRouter from './src/routes/user.routes.ts'


const books = new Map<string, any>();

books.set("1", {
  id: "1",
  title: "The Hound of the Baskervilles",
  author: "Conan Doyle, Arthur",
});

// const router = new oak_Router();

// router
//   .get("/", (context) => {
//     context.response.body = "Hello world!";
//   })
//   .get("/book", (context) => {
//     context.response.body = Array.from(books.values());
//   })
//   .get("/book/:id", (context) => {
//     if (books.has(context?.params?.id)) {
//       context.response.body = books.get(context.params.id);
//     }
//   });

const app = new oak_Application();

app.use(oakCors())

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

await app.listen({ port: 8000 })