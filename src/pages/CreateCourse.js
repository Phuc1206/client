import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
function CreateCourse(){
    const initialValues = {}
    const onSubmit = (data) =>{
        console.log(data);
    }
    return(
        <div className="CreateCoursePage">
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                <Form>
                    <label>Course name</label>
                    <Field 
                        autocomplete="off"
                        name="name"
                        placeholder="ex. HTML"
                        />
                    <label>Course description</label>
                    <Field
                        autocomplete="off"
                        name="description"
                        placeholder="desc"
                        />
                    <label>Course video id</label>
                    <Field
                        autocomplete="off"
                        name="videoId"
                        placeholder="video id"
                        />
                    <label>Course level</label>
                    <Field
                        autocomplete="off"
                        name="level"
                        placeholder="number of levels"
                        />
                </Form>
            </Formik>
        </div>
    )
}
export default CreateCourse