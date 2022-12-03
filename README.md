# mentor-student-api

Welcome to mentor-student api; where Mentor and Students can be created; 
Students can be assigned to mentor;
All the duplicates from Students collection will be removed using aggregation methods; when using the GET command


#Endpoints

1) GET - "/" - API home 
2) GET - "/students" - Get all students from db
3) GET - "/mentors" - Get all mentors from db
4) POST - "/Student" - Post single student data to db; 
            Schema: {"name": "name",
        "email": "email@gmail.com",
        "course": "MERN Stack",
        "mentorAssigned": "mentorname"
    }
5)POST - "/mentor" - Post single mentor data to db;
        Schema: {"name": "name",
        "email": "email@gmail.com",
        "course": "MERN Stack",
        "studentAssigned": [all students in array]
    }
    
 6)POST - "/studentstomentor" - Post registerd students to a mentor; Only registered students will be able to assign a mentor; non-registered will be filterd out.
