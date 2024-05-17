const router = require('express').Router();
const Employer = require("../Models/EmployersModel");
const Job = require('../Models/JobsModel');
const App = require('../Models/ApplicationsModel');


router.post("/employers", async (req, res) => {
  try {
    const employer = new Employer(req.body);
    await employer.save();
    res.status(201).send(employer);
  } catch (error) {
    res.status(400).send(error);
  }
});


router.get("/employers", async (req, res) => {
  try {
    const employers = await Employer.find();
    res.send(employers);
  } catch (error) {
    res.status(500).send(error);
  }
});


router.get("/employers/:id", async (req, res) => {
  try {
    const employer = await Employer.findById(req.params.id);
    if (!employer) {
      return res.status(404).send();
    }
    res.send(employer);
  } catch (error) {
    res.status(500).send(error);
  }
});


router.patch("/employers/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["CompanyName", "Email", "Password", "Phone", "Address"];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const employer = await Employer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!employer) {
      return res.status(404).send();
    }
    res.send(employer);
  } catch (error) {
    res.status(400).send(error);
  }
});


router.delete("/employers/:id", async (req, res) => {
  try {
    const employer = await Employer.findByIdAndDelete(req.params.id);
    if (!employer) {
      return res.status(404).send();
    }
    res.send(employer);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/applications/:email',async (req,res)=>{
  const {_id}= await Employer.findOne({Email: req.params.email});
  console.log(_id);
  const jobs=await Job.find({EmployerID:_id});
  const ids = jobs.map(job => job._id);
  const applications = [];
  for (const id of ids) {
    const jobApplications = await App.find({ JobID: id });
    console.log(jobApplications);
    for (const x of jobApplications){
      applications.push(x);
    }
  }
  console.log(jobs);
  console.log(ids);
  console.log(applications);
  res.status(202).json({"Applications":applications});
})

module.exports = router;
