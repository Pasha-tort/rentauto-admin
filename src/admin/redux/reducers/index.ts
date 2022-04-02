import { combineReducers } from "redux";
import reducerEditor from "./reducerEditor";
import reducerMessages from './reducerMessages';
import reducerContextMenu from './reducerContextMenu';
import reducerModal from './reducerModal';
import reducerPanelEditor from './reducerPanelEditor';

//types
import { DefaultRootState } from 'react-redux';
import { TypeStateContextMenu } from './reducerContextMenu';
import { TypeStateEditor } from './reducerEditor';
import { TypeStateMessages } from './reducerMessages';
import  {TypeStateModal} from './reducerModal';
import { TypeStatePanelEditor } from './reducerPanelEditor';

export interface R extends DefaultRootState {
	reducerContextMenu: TypeStateContextMenu,
	reducerEditor: TypeStateEditor,
	reducerMessages: TypeStateMessages,
	reducerModal: TypeStateModal,
	reducerPanelEditor: TypeStatePanelEditor,
}

const rootReducer = combineReducers({
	reducerEditor,
	reducerMessages,
	reducerContextMenu,
	reducerModal,
	reducerPanelEditor,
});

export default rootReducer;