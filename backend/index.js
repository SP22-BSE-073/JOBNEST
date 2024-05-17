const express = require('express');
const app = express();
const {JobSeekerSignUp, EmployerSignUp} = require("./utils")
const cors = require('cors');

require('./Connection/Connection');
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


const jobSeekerRoutes = require('./Routes/JobSeekerRoutes');
const employerRoutes = require('./Routes/EmployersRoutes');
const jobRoutes = require('./Routes/JobsRoutes');
const applicationRoutes = require('./Routes/ApplicationsRoutes');
const interviewRoutes = require('./Routes/InterviewsRoutes');


app.use("/seek",jobSeekerRoutes);
app.use("/emp",employerRoutes);
app.use("/jb",jobRoutes);
app.use("/ap",applicationRoutes);
app.use("/int",interviewRoutes);

app.post("/signup", (req, res)=> {
    console.log('Sign Up')
    if(req.body.userType === 'job_seeker'){
    console.log('Seeker Up')
        JobSeekerSignUp(req, res)
    }
    else if (req.body.userType === 'employer')
    {
    console.log('Employer Up')
        EmployerSignUp(req, res)
    }
})


app.listen(PORT, () => {
    console.log('App is listening on port : ' + PORT);
});
