import React from "react";
function CreateCourse(){
    return(
        <div className="CreateCourse">
            <h2>Create a new Course</h2>
            <form>
                <input type="text" placeholder="Course Title"/>
                <input type="text" placeholder="Course Description"/>
                <input type="text" placeholder="Course Video ID"/>
                <button type="submit">Submit</button>
            </form>
            
        </div>
    )
}
export default CreateCourse