import { combineReducers } from "redux";
import reducerEditor from "./reducerEditor";
import reducerMessages from './reducerMessages';
import reducerContextMenu from './reducerContextMenu';

const rootReducer = combineReducers({
	reducerEditor,
	reducerMessages,
	reducerContextMenu,
});

export default rootReducer;