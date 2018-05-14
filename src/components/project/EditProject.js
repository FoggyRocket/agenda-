import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as projectActions from "../../redux/actions/projectActions";
import {Toast, ToastDanger} from 'react-toastr-basic';
import {TextField, DatePicker,Checkbox} from 'material-ui';

class EditProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            project:{},


        }
    }


    //text Name task
    taskHandleChange = (e) => {
        let project = Object.assign({}, this.state.project);
        project[e.target.name] = e.target.value;
        this.setState({project});
        console.log(project)
    };

    //date
    dateStart = (e,date) => {
        let project= Object.assign({},this.state.project);
        project['created_date'] = date;
        this.setState({project})
        console.log(project)
    };
    dateFinish = (e,date) => {
        let project= Object.assign({},this.state.project);
        project['due_date'] = date;
        this.setState({project})

    };

    onSubmit=(e)=>{
        e.preventDefault();
        let project= Object.assign({},this.state.project);

        project['id']=this.props.project.id;
        this.props.projectActions.updateProject(project)
            .then(r=>{
                Toast('¡Proyecto editado!')
                this.props.close();
            }).catch(e=>{
            console.log(e)
            ToastDanger('¡Algo paso!')

        });


    };




    render() {
        const actions = [
            <FlatButton
                label="Cancelar"
                primary={true}
                onClick={this.props.close}
            />,

            <FlatButton
                label="Guardar"
                primary={true}
                onClick={this.onSubmit}
            />
        ];

        let date_start = new Date(this.props.project.created_date);
        let date_finish = new Date(this.props.project.due_date);


        return (
            <div>
                <Dialog
                    title="Editar proyecto"
                    modal={false}
                    open={this.props.open}
                    bodyStyle={{display:'flex', justifyContent:'space-around'}}
                    onRequestClose={this.props.close}
                    actions={actions}
                >
                    <div className={"form"}>
                        <TextField
                            required
                            floatingLabelText="Nombre del proyecto"
                            name="name_project"
                            defaultValue={this.props.project.name_project}
                            fullWidth
                            onChange={this.taskHandleChange}
                        /><br/>
                        <DatePicker
                            required
                            floatingLabelText="Fecha de inicio"
                            defaultDate={date_start}
                            textFieldStyle={{width: "100%"}}
                            style={{width: "100%"}}
                            autoOk
                            minDate={new Date()}
                            onChange={this.dateStart}
                        /><br/>
                        <DatePicker
                            required
                            floatingLabelText="Fecha de vencimiento"
                            textFieldStyle={{width: "100%"}}
                            style={{width: "100%"}}
                            autoOk
                            defaultDate={date_finish}
                            onChange={this.dateFinish}
                        />
                    </div>


                </Dialog>
            </div>
        );
    }
}
function mapStateToProps(state, ownProps) {




    return {


    }
}

function mapDispatchToProps(dispatch) {
    return{

        projectActions:bindActionCreators(projectActions,dispatch),
    }
}

EditProject = connect(mapStateToProps, mapDispatchToProps)(EditProject);
export default EditProject;
