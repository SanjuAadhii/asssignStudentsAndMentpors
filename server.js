const express = require("express");
const app = express();
app.use(express.json());

const students=[];
const mentors=[];
const studentsMentorAsssignments={};
 
app.post("/student",(req,res)=>{
    let {name}=req.body;
    let student = {id:students.length+1,name};
    students.push(student)
    res.status(200).json(student)

});

app.post("/mentor",(req,res)=>{
    let {name}=req.body;
    let mentor = {id:mentors.length+1,name};
    mentors.push(mentor)
    res.status(200).send(mentor)

});

app.post("/mentors/:mentorId/students",(req,res)=>{
    let {mentorId}=req.params;
    let { studentsId}=req.body;

    if(!mentors.find(m=>{m.id==mentorId}))
    {
        return res.status(404).json(`Mentor id # ${mentorId} not found`)
    }
    studentsId.forEach(studentId => {
        if(students.find(s=>{s.id==studentId})){
            return res.status(404).json(`Student id # ${studentId} not found`)
        }
        studentsMentorAsssignments[studentId]=mentorId
       
    });
    res.status(200).send( studentsMentorAsssignments)
})

app.put("/student/:studentId/mentor",(req,res)=>{
    let {studentId}=req.params;
    let {mentorId}=req.body;

    if(mentors.find(m=>{m.id==mentorId}))
    {
        return res.status(404).json(`Mentor id # ${mentorId} not found`)
    }
 
        if(!students.find(s=>{s.id==studentId})){
            return res.status(404).json(`Student id # ${studentId} not found`)
        }
        studentsMentorAsssignments[studentId]=mentorId
        res.status(200).send( studentsMentorAsssignments)

      
});

app.get("/mentors/:mentorId/students",(req,res)=>{
    const { mentorId } = req.params;
    const assignedStudents = students.filter(student => studentMentorAssignments[student.id] == mentorId);
    res.status(200).json(assignedStudents);
});
// Show the previously assigned mentor for a particular student
app.get('/students/:studentId/mentor', (req, res) => {
    const { studentId } = req.params;

    if (!students.find(s => s.id == studentId)) {
        return res.status(404).json({ error: 'Student not found' });
    }

    const mentorId = studentMentorAssignments[studentId];
    const mentor = mentors.find(m => m.id == mentorId);

    if (!mentor) {
        return res.status(404).json({ error: 'No mentor assigned to this student' });
    }

    res.status(200).json(mentor);
});
app.listen(3000)
