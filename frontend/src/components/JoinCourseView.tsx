import React from 'react';
import { Card } from 'react-bootstrap';

function JoinCourseView({ match }: { match: any }) {
    const id = match.params.id;

    // get course name from server using

    return (
    <div>
        <h1>Course title: TBD </h1>
        
        <h2>Course id: {id}</h2>
    </div>
    );
}


export default JoinCourseView;
