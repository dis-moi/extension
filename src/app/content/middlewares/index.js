import { backgroundPublisher } from "./backgroundPublisher";
import sagaMiddleware from "./saga";

export { sagaMiddleware };

export default [backgroundPublisher, sagaMiddleware];
