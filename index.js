import { MongoClient } from "mongodb";
import cors from 'cors'
import express, { response } from "express"; 
import * as dotenv from 'dotenv'; 
import { getAllStudents, getStudentByName, insertStudent, getAllMentors, getMentorByName, insertMentor, insertStudentToMentor } from "./Services.js";




dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());



const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;



async function MongoConnect(){
    const client = await new MongoClient(MONGO_URL).connect();
    console.log('Mongo Connected')
    return client;
}

export const client = await MongoConnect();




app.get("/", function (request, response) {
  response.send("🙋‍♂️ Welcome to Mentor-Student API");
});

app.get("/students",async (req,res)=>{
    
    try {
        const data = await getAllStudents();       
        res.send(data);
    } catch (error) {
        console.log(error);
        res.send({msg:error})      
    }
})

app.post("/student", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const course = req.body.course;
  const mentorAssigned = req.body.mentorAssigned;

  const student = await getStudentByName(name);
  if (!student) {
    try {
      const data = await insertStudent(name, email, course, mentorAssigned);
      console.log(data);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.send({ msg: error });
    }
  } else {
    res.send({ msg: "student already registered" });
  }
});

app.get("/mentors",async (req,res)=>{
    try {
        const data = await getAllMentors();        
        res.send(data);
    } catch (error) {
        console.log(error);
        res.send({msg:error})      
    }
})

app.post("/mentor",async(req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const course = req.body.course;
    const country = req.body.country;
    const about = req.body.about;
    const acceptedTerms  = req.body.acceptedTerms;
    const image = req.body.image;
    const studentsAssigned = req.body.studentsAssigned;
    const mentor = await getMentorByName(name)
    if(!mentor){
        try {
            const data = await insertMentor(name, email, course, studentsAssigned,acceptedTerms,image,country,about);
            console.log(data)
            res.send(data)      
        } catch (error) {
            console.log(error);
            res.send({msg:error})        
        }
    }else{
        res.send({msg:"mentor already registered"})
    }    
})

app.post("/studentstomentor", async (req, res) => {
  const students = req.body.students;
  const mentor = req.body.mentor;
  var added = [];
  var notRegistered = [];
  const dbmentor = await getMentorByName(mentor);

  if (dbmentor) {

    students.forEach(async (student) => {

      const dbstudent = await getStudentByName(student);

      if (dbstudent) {
        const newstuds = await insertStudentToMentor(dbmentor, student);
        notRegistered.push(dbstudent.name)
        console.log(dbstudent.name)
      } else {
        notRegistered.push(student);
        console.log(student)
      }
    });

    app.put("/editmentor",async(req,res)=>{
      const initialName = req.body.initialName;
      const name = req.body.name;
      const email = req.body.email;
      const course = req.body.course;
      const country = req.body.country;
      const about = req.body.about;
      const acceptedTerms  = req.body.acceptedTerms;
      const image = req.body.image;
      const studentsAssigned = req.body.studentsAssigned;
      const mentor = await getMentorByName(initialName)
      if(mentor){
          try {
              const data = await updateMentor(initalName, name, email, course, studentsAssigned,acceptedTerms,image,country,about);
              console.log(data)
              res.send({msg:"mentor updated successfully"})      
          } catch (error) {
              console.log(error);
              res.send({msg:error})        
          }
      }else{
          res.send({msg:"mentor not registered"})
      }    
  })

    res.send({
      msg: `Added: ${added}; Not registered students: ${notRegistered}`,
    });
  }
});




app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));




