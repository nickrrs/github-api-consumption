import { App } from "./server/app";

new App().server.listen(3333, () => {
    console.log(`Server started on port 3333`);
});