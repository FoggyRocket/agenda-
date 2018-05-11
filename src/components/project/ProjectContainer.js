import React, {Component, Fragment} from 'react';
import {ProjectTable} from './ProjectsTable';
import {FloatingActionButton} from 'material-ui';
import IconFAB from 'material-ui/svg-icons/content/add';
import {Switch,Route} from 'react-router-dom';
import NewProject from './AddNewProjectPage';
import './ProjectStyles.css';
import {connect} from 'react-redux';
import * as profileActions from "../../redux/actions/profileActions";
import * as userActions from "../../redux/actions/userActions";
import {bindActionCreators} from "redux";
import * as projectActions from "../../redux/actions/projectActions";
import Loader from '../common/Loading'


class ProjectContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
        };
    }

    closeModal = () => {
        this.props.history.push('/agenda/project');
    };

    onSubmit = () => {
        this.props.history.push('/agenda/project');
    };

    render() {
        const {projects, fetched} = this.props;
        if(!fetched)return<Loader/>
        const NewProjectModal = (props) => (
            <NewProject
                onSubmit={this.onSubmit}
                onCancel={this.closeModal}
                {...this.props}
                {...props}
            />
        );
        return (
            <Fragment>
                {
                        <Fragment>
                            <ProjectTable
                                projects={projects}
                            />
                            <Switch>
                                <Route path="/agenda/project/:id" render={NewProjectModal}/>
                            </Switch>
                            <FloatingActionButton
                                style={fabStyle}
                                onClick={()=>this.props.history.push('/agenda/project/add')}
                            >
                                <IconFAB/>
                            </FloatingActionButton>
                        </Fragment>

                }
            </Fragment>
        );
    }
}

const fabStyle = {
    position: 'fixed',
    bottom: 15,
    right: 15
};


    function mapStateToProps(state, ownProps) {
        let user =state.user.object;
        let profile = state.profile.object;
        let projects = state.projects.list;
        if(user.is_staff){
            projects = state.projects.list;
        }else{
            projects=state.projects.myProjects;
        }


        console.log(projects)
        return {
            user,
            profile,
            projects,
            fetched:  projects!==undefined && state.projects.list !== undefined,
        }

    }

    function mapDispatchToProps(dispatch){
        return{
            projectActions:bindActionCreators(projectActions,dispatch),
            userActions:bindActionCreators(userActions,dispatch),
            profileActions:bindActionCreators(profileActions,dispatch)
        }
    }

    ProjectContainer = connect (mapStateToProps,mapDispatchToProps)(ProjectContainer);
export default ProjectContainer;