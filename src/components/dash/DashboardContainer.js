import React,{Component}from 'react';
import {DashboardDisplay} from './DashboardDisplay';
import NewFastNote from './NewFastNote';
import ViewFastNote from './ViewFastNote';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as fastNoteActions  from '../../redux/actions/fastNoteActions';
import * as userActions  from '../../redux/actions/userActions';
import * as projectActions from "../../redux/actions/projectActions";
import Loader from '../common/Loading';



class DashContainer extends Component{
  state = {
      openNewFastNote:false,
      openViewFastNote:false,
      data:{},
  };
  openNote=()=>{
    let {openNewFastNote}=this.state;
    openNewFastNote = !openNewFastNote;
    this.setState({openNewFastNote})
    console.log("HOLA")
  }

  viewNote=(note)=>{
    let {openViewFastNote}=this.state;
    openViewFastNote = !openViewFastNote;
    let data = Object.assign({},this.state.data);
    data = note
    this.setState({openViewFastNote, data})

  }

    render(){
       let d = new Date()
       let {fastnote,fetched,myTask,projects} = this.props;
       if(!fetched)return<Loader/>
        console.log("mis project", projects)
        return(
          <div>
            <NewFastNote close={this.openNote} open={this.state.openNewFastNote} />
            <ViewFastNote close={this.viewNote} open={this.state.openViewFastNote} data={this.state.data}/>
            <DashboardDisplay date={d} open={this.openNote} fastnote={fastnote} viewNote={this.viewNote}/>
          </div>

        );
    }
}

function mapStateToProps(state, ownProps) {
  let userAll=state.userAll.list
  let user=state.user.object
  let projects=state.projects.myProjects;
  let fastnote = state.fastnote.list.filter(f=>{
    return  user.id== f.user.id
  })
     return {
        fastnote,
        projects,
        myTask: state.tasks.myTasks,
        fetched:  fastnote!==undefined && projects!==undefined,

     }

}
function mapDispatchToProps(dispatch) {
    return{
        projectActions:bindActionCreators(projectActions,dispatch),
        fastNoteActions:bindActionCreators(fastNoteActions,dispatch),
        user:bindActionCreators(userActions,dispatch),
    }
}

DashContainer = connect(mapStateToProps, mapDispatchToProps)(DashContainer);
export default DashContainer;
