import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSagas from "../actions/sagas/root.sagas";
import rootReducers from "../reducers/root.reducers";

const sagaMiddleware = createSagaMiddleware();
const composeEnchancer =
  (window as any)["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || compose;

const configureStore = () => {
  const store = createStore(
    rootReducers,
    composeEnchancer(applyMiddleware(sagaMiddleware))
  );
  sagaMiddleware.run(rootSagas);
  return store;
};

export default configureStore;
