import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function CreateCourse() {
    const initialValues = {
        name: '',
        description: '',
        videoId: '',
        level: '',
    };
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        description: Yup.string().required('Description is required'),
        videoId: Yup.string().required('Video id is required'),
        level: Yup.number().min(0).max(5).required('Level is required'),
    });
    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <div className="CreateCoursePage">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form>
                    <label>Course name</label>
                    <ErrorMessage name="name" component="div" className="error" />
                    <Field autoComplete="off" name="name" placeholder="ex. HTML" />
                    <label>Course description</label>
                    <ErrorMessage name="name" component="div" className="error" />
                    <Field autoComplete="off" name="description" placeholder="desc" />
                    <label>Course video id</label>
                    <ErrorMessage name="name" component="div" className="error" />
                    <Field autoComplete="off" name="videoId" placeholder="video id" />
                    <label>Course level</label>
                    <ErrorMessage name="name" component="div" className="error" />
                    <Field autoComplete="off" name="level" placeholder="number of levels" />
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    );
}
export default CreateCourse;
