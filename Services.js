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

export function deleteMentorByName(name){
    return client.db("Mentor-Student").collection("Mentor").deleteOne({ name: name });
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
export function insertStudent(name, email, course, mentorAssigned) {
    return client
        .db("Mentor-Student")
        .collection("Student")
        .insertOne({
            name: name,
            email: email,
            course: course,
            mentorAssigned: mentorAssigned,
        });
}
export function getStudentByName(name) {
    return client.db("Mentor-Student").collection("Student").findOne({ name: name });
}
export function getAllStudents() {
    return client.db("Mentor-Student").collection("Student").find({}).toArray();
}
