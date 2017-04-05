import React from 'react';
import {CustomForm,CustomInput} from '../../../components/forms';
import {Link} from 'react-router-dom';

export default function ProjectList({projects,addProject}) {
    return <div className="projects col-md-6 text-center">
        <h3>Choose a project or add a new one</h3>
        <table className="table table-hover ">
            <tbody>
            {(projects || []).map(project=>
                <tr key={project.id}>
                    <td>
                        <Link to={`/project/${project.id}`}>
                            {project.name}
                        </Link>
                    </td>
                </tr>
            )}
            <tr><td key="add_project">
                <CustomForm name="add-project-form" onSave={addProject}>
                    <CustomInput type="text" name="name" >
                        Add new project:
                    </CustomInput>
                    <button type="submit">Add</button>
                </CustomForm>
            </td></tr>
            </tbody>
        </table>
    </div>;
}