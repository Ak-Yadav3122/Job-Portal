import {Company} from "../models/company.model.js" // when we not use default export then we have to use currely brackets i.e; {Company}

import getDataUri from "../Utils/DataUri.js";
import cloudinary from "../Utils/Cloudinary.js";

export const registerCompany = async(req,res)=>{
    try {
        const {companyName} = req.body;
        if(!companyName){
            return res.status(400).json({
                message:"please enter a valid company name",
                success:false
            })
        }

        //code for the company find 
        let company = await Company.findOne({name:companyName});

        // check company is unique or not
        if(company){
            return res.status(400).json({
                message:"You can not register the sane company",
                success:false

            })
        }
        //create company field

        company = await Company.create({
            name:companyName,
            userId: req.id
        });
        return res.status(201).json({
            message:"Company registeredSuccessfully.",
            company,
            success:true
        })
     } catch (error) {
        console.log(error);
        
    }
}

// for get the company for login user
export const getCompany = async (req, res) => {
    try {
        const userId = req.id; // logged in user id
        const companies = await Company.find({ userId });
        if (!companies) {
            return res.status(404).json({
                message: "Companies not found.",
                success: false
            })
        }
        return res.status(200).json({
            companies,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

// get company by id

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id; //we use .params to gat the id when we have this "/get/:id" type of API
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

//for update the company details

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
 
        const file = req.file;
        // idhar cloudinary ayega
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;
    
        const updateData = { name, description, website, location,logo};

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        return res.status(200).json({
            message:"Company information updated.",
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}

