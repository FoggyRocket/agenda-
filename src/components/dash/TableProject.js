import React from 'react';
import {Card, CardTitle} from 'material-ui';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui';
import {RowBody} from "../project/RowBody";

export const TableProject = ({projects = [], selectedRows}) => (

            <Table
                fixedHeader
                multiSelectable
            >
                <TableHeader
                    displaySelectAll={false}
                    adjustForCheckbox={false}
                >
                    <TableRow>
                        <TableHeaderColumn>Nombre</TableHeaderColumn>
                        <TableHeaderColumn>Inicio</TableHeaderColumn>
                        <TableHeaderColumn>Fecha de vencimiento</TableHeaderColumn>
                        <TableHeaderColumn>Concluido</TableHeaderColumn>
                        <TableHeaderColumn>Detalle</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {
                        projects.length > 0 ?
                            projects.map( (project, index) => (
                                    <RowBody
                                        key={index}
                                        data={project}
                                        selectedRows={selectedRows}
                                        {...this.props}
                                    />
                                )
                            ):
                            <TableRow selectable={false}>
                                <TableRowColumn colSpan="5">No existen proyectos</TableRowColumn>
                            </TableRow>
                    }
                </TableBody>
            </Table>
);
