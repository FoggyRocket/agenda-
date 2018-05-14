import React from "react";
import Icon from 'material-ui/svg-icons/editor/mode-edit';
import {IconButton} from 'material-ui';

export const ProjectTitle = ({project:{name_project}, goToEdit,isStaff}) => (
    <div className="title">
        <h1>{name_project}</h1>
        {isStaff ? <IconButton onClick={goToEdit}>
            <Icon/>
        </IconButton>:
            false}
    </div>
);