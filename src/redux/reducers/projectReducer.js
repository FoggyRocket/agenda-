import {combineReducers} from 'redux';
import {CREATE, READ, UPDATE, DELETE, FETCHED,READMY} from '../actions/projectActions';


function list(state=[], action){
    switch (action.type){
        case CREATE:
            return [...state, action.project];
        case READ:
            return action.projects;
        case UPDATE:
            return state.map( project => {
                if (project.id === action.project.id ) return action.project;
                return project;
            });
        case DELETE:
            return state.filter( project => project.id !== action.idProject );
        default:
            return state;
    }
};

function myProjects(state=[],action) {
    switch (action.type) {
        case READMY:
            return action.myProjects
        case CREATE:
            return [...state, action.project];
        case READ:
            return action.projects;
        case UPDATE:
            return state.map(project => {
                if (project.id === action.project.id) return action.project;
                return project;
            });
        case DELETE:
            return state.filter(project => project.id !== action.idProject);
        default:
            return state;
    }
}

// Determine if projects have fetched from server
const areFetched = (state = false, action) => {
    switch (action.type){
        case FETCHED:
            return action.status;
        default:
            return state;
    }
};

const projectReducer = combineReducers({
    list:list,
    myProjects:myProjects,
    areFetched
});

export default projectReducer;