import { client } from "./index.js";

export function insertStudentToMentor(dbmentor, student) {
    return client
        .db("Mentor-Student")
        .collection("Mentor")
        .updateOne(
            { mentor: dbmentor.mentor },
            {
                $push: {
                    studentAssigned: student
                }
            }
        );
}
export function insertMentor(data) {
    return client.db("Mentor-Student").collection("Mentor").insertOne(
       data
    );
}

export function updateMentor(initialName,rest){
    return client.db("Mentor-Student").collection("Mentor").updateOne({name:initialName},{
        $set:
            rest
        
    })
}

export function updateStudent(initialName,rest){
    return client.db("Mentor-Student").collection("Student").updateOne({name:initialName},{
        $set:
            rest
        
    })
}

export function deleteMentorByName(name){
    return client.db("Mentor-Student").collection("Mentor").deleteOne({ name: name });
}

export function deleteStudentByName(name){
    return client.db("Mentor-Student").collection("Student").deleteOne({ name: name });
}





export function getMentorByName(name) {
    
    return client.db("Mentor-Student").collection("Mentor").findOne({ name: name });
}

export async function getAllMentors() {
    return await client.db("Mentor-Student").collection("Mentor").aggregate([
        {
            "$project": {
                "name": 1,
                "email": 1,
                "course": 1,
                "country":1,
                "about":1,
                "image":1,
                "studentAssigned": {
                    "$setUnion": [
                        "$studentAssigned", []
                    ]
                }
            }
        }
    ]).toArray();
}
// return client.db("Mentor-Student").collection("Mentor").find({}).toArray();
export function insertStudent(newStudent) {
    return client
        .db("Mentor-Student")
        .collection("Student")
        .insertOne(newStudent);
}
export function getStudentByName(name) {
    return client.db("Mentor-Student").collection("Student").findOne({ name: name });
}
export function getAllStudents() {
    return client.db("Mentor-Student").collection("Student").find({}).toArray();
}
