import User from '../model/User.js'
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
    cloud_name: 'dzhl7dmsp',
    api_key: '323466687184448',
    api_secret: 't8YR62TWigv3q2gTHL3mtIoTVzM'
});
export default class UserController {
    // for the save User
    saveUser = (req, res) => {
        const file = req.files.avtar;
        cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
            console.log(result)
            if (err) {
                console.log("there is error with file upload", err);
                return;
            }
            else{ 
                const data = {
                    name: req.body.name,
                    password: req.body.password,
                    email: req.body.email,
                    AccountType: req.body.AccountType,
                    bio: req.body.bio,                  
                    avtar:result.url,
                    publicId:result.public_id,
                    secure_url:result.secure_url
                }
                User.create(data).then(user=>{
                    return res.json({
                        User: user
                    })
                }).catch(err=>{
                    console.log("There is Error while save User");
                    return;
                })
            }
        })

    }

    // for the Get All Data
    getAllUser = async (req, res) => {
        try {
            const user = await User.find({});
            return res.json({
                message: user
            })
        } catch (err) {
            console.log("there is error with Finding All USer", err);
            return;
        }
    }

    // for the Delete User
    deleteUser = async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            cloudinary.uploader.destroy(user.publicId,(err,result)=>{
                if(err){
                    return res.json({Message: `There is problem with deletion ${err}`})
                }
                return res.json({ message: "User deleted", user });
            })          
           
        } catch (err) {
            console.error("Error during delete user", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    };

    // for the Getting Indivisual User
    getUser = async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            return res.json({ User: user })
        } catch (err) {
            console.log("There is problem with Geting user", err);
            return;
        }
    }

    // for the Update User
    updateUser = async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
    
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            if (req.files && req.files.avtar) {
                // Delete the old image in Cloudinary
                await cloudinary.uploader.destroy(user.publicId);
    
                // Upload the new image to Cloudinary
                const image = req.files.avtar;
                const { secure_url, public_id } = await cloudinary.uploader.upload(image.tempFilePath);
    
                // Update the user data with the new image URL and public ID
                user.avtar = secure_url;
                user.publicId = public_id;
    
                // Save the updated user data
                const updatedUser = await user.save();
    
                return res.json({ message: 'User and image updated', user: updatedUser });
            }
    
            // If there's no new image to upload, only update user data
            const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body);
            return res.json({ message: 'User updated', user: updatedUser });
        } catch (err) {
            console.error('There was an error while updating the user and image:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    };
    
}
