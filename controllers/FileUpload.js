const File=require('../models/File')
const cloudinary = require("cloudinary").v2
 
// localfileUpload ----> handler function

exports.localFileUpload=async (req,res)=>{
    try{
        // fetch the file from the request
        // file ----> is the same name as given in testing to key in form data under body
        const file=req.files.file
        console.log("FILE AA GAE MADAM JE",file)

        // Server pe kis path pe file store karna chahte ho
        // __dirname ----> gives the path of current working directory 
        // the above file object has name key from whihch we can get extension
        // Create paths where file needs to be stored on server
        let path=__dirname +  "/files/" + Date.now() + `.${file.name.split('.')[1]}`// server path
        console.log("PATH ----> ",path)
        // to move the file we need to define the mv function in file
        // add path to move function
        file.mv(path ,(err)=>{
            console.log(err)
        })
        // create a success response
        res.json({
            success:true,
            message:'Local file uploaded successfully'
        })
    }
    catch(error){
        console.log("Not able to upload the files on server")
        console.log(error)
    }
}

function isFileTypeSupported(type,supportedTypes){
    return supportedTypes.includes(type)
}

async function uploadFiletoCloudinary(file,folder,quality) {
    const options={folder}
    console.log("temp file path ",file.tempFilePath)

    if(quality){
        options.quality=quality
    }
    options.resource_type='auto'
    return await cloudinary.uploader.upload(file.tempFilePath,options)
    // return await cloudinary.uploader.upload_large(file.tempFilePath,options)
}
// -------------------------------------------------------------------------------------------
// image upload ka handler
exports.imageUpload=async (req,res) => {
    try{
        // data fetch
        const {name,tags,email} = req.body;
        console.log(name,tags,email);

        const file=req.files.imageFile  //Key value should be imageFile
        console.log(file)

        // Validation
        const supportedTypes=['jpg','jpeg','png']
        const fileType=file.name.split('.')[1].toLowerCase()
        console.log("Filetype : ",fileType)
        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File format not supported'
            })
        }

        // if file format supported hai
        console.log("Uploading to Codehelp")
        const response = await uploadFiletoCloudinary(file,"FileUploadProject")
        console.log(response)

        // db mein entry save karne hai
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        })

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Image Successfully Uploaded'
        }) 
    }
    catch(error){
        console.error(error)
        res.status(400).json({
            success:false,
            message:'Something went wrong'
        })
    }
}

// --------------------------------------------------------------------------------------------
// Video upload ka handler

exports.videoUpload= async (req,res)=>{
    try{
        // data fetch
        const {name,tags,email}=req.body;
        console.log(name,tags,email);

        const file =req.files.videoFile
        console.log("File ",file)
        // Validation
        const supportedTypes = ['mp4','mov'];
        const fileType=file.name.split('.')[1].toLowerCase();
        console.log("File Type : ",fileType)

        // HW TODO :add a upper limit of 5MB for Video
        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File format not supported"
            })
        }

        // if file  format supported hai

        // Upload to cloudinary
        console.log("Uploading to Codehelp")
        const response = await uploadFiletoCloudinary(file,"FileUploadProject")
        console.log(response)

        // Create a entry in database
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        })

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Video Successfully Uploaded'
        })
    }
    catch(error){
        console.error(error)
        res.status(400).json({
            success:false,
            message:'Something went wrong'
        })
    }
}

// ------------------------------------------------------------------------------------------------

// imageSizeReducer Handler

exports.imageSizeReducer = async (req,res)=>{
    try{
        // data fetch
        const {name,tags,email} = req.body;
        console.log(name,tags,email);

        const file=req.files.imageFile  //Key value should be imageFile
        console.log(file)

        // Validation
        const supportedTypes=['jpg','jpeg','png']
        const fileType=file.name.split('.')[1].toLowerCase()
        console.log("Filetype : ",fileType)

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File format not supported'
            })
        }

        // if file format supported hai
        console.log("Uploading to Codehelp")
        // HW TODO ---> Use height attribute to compress the file
        const response = await uploadFiletoCloudinary(file,"FileUploadProject",30)
        console.log(response)

        // db mein entry save karne hai
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        })

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Image Successfully Uploaded'
        }) 
    }
     catch(error){
        console.error(error)
        res.status(400).json({
            success:false,
            message:'Something went wrong'
        })
    }
}