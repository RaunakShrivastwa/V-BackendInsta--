import {v2 as cloudinary} from 'cloudinary';
import User from '../model/User.js';
import Memory from '../model/Memory.js'
cloudinary.config({
    cloud_name: 'dzhl7dmsp',
    api_key: '323466687184448',
    api_secret: 't8YR62TWigv3q2gTHL3mtIoTVzM'
});
export default class Memory{

    addMemory= async (req,res)=>{
        const userId= req.params.id;
        try{
             const img= req.files.img;
            const upload= await cloudinary.uploader.upload(img.tempFilePath)
            
        }catch(err){
            console.log("There is Error With Operations ",err);
            return;
        }
    }

    getAllMemory = async (req,res)=>{
        
    }
}