import { Job } from "../models/job.model.js";
//for recuriter
//for post the job
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      experience,
      location,
      jobType,
      position,
      companyId,
    } = req.body;
    //for gettting user ID
    const userId = req.id;

    //check point to check company neccessary details
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !experience ||
      !location ||
      !jobType ||
      !position ||
      !companyId
    ) {
      return res.status(401).json({
        message: "Something is missing.",
        success: false,
      });
    }
    //create the job profile
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location: location.split(","),
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
    });
    return res.status(201).json({
      message: "New Job created successfully.",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//for students
// for getting all jobs
export const getAllJobs = async (req, res) => {
  try {
    // adding filtering for knowing the specific area of jobs by using req.query.keyword
    const keyword = req.query.keyword || "";

    /*creation of query
        example:http://localhost:5000/api/a1/company/get?keyword=webdeveloper
        in above example ?keyword=webdeveloper are the query
        */
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });

    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
//for studens
//get job details by their id

export const getJobById = async (req, res) => {
  try {
    //getting jobId
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      //populate are use id user applied jo priviously then show them alreday applied
      path: "applications",
    });
    if (!job) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//for recuriter
// to know how much job is created by admin
export const getAdminJobs = async (req, res) => {
  try {
    // getting adminId
    const adminId = req.id;
    
    // created_by: adminId, means jo recuriter login hoga usaka sara post kiya job milega
    const jobs = await Job.find({ created_by: adminId }).populate({  
      path: "company",
      createdAt:-1
    }); 
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs are not found.",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
