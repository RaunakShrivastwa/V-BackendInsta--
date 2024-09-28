import User from '../model/User.js'
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import PasswordEncrypt from '../config/PasswordEncrypt.js';
import AccountMailer from '../Mailer/comment/AccountMailer.js'
import { LocalStorage } from 'node-localstorage';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Set up a local storage instance (it uses a temporary file for storage)
const localStorage = new LocalStorage('./scratch');

const mail = new AccountMailer();

dotenv.config();
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});
export default class UserController {
    // for the save User
    config = new PasswordEncrypt();
    saveUser = async (req, res) => {
        try {

            if (!this.isValidPassword(req.body.password)) {
                return res.status(400).json({ error: 'Password must have at least one letter (uppercase or lowercase), one digit, and one special symbol' });
            }
            console.log(req.body);

            const date = new Date();
            const file = 'no file';
            const data = {
                name: req.body.name,
                password: this.config.encryptText(req.body.password, 'KeepCoding'),
                email: req.body.email,
                AccountType: req.body.AccountType || 'Normal',
                bio: req.body.bio || 'This is Dummy User'
            }
            if (file) {
                data.avtar = file;
            }
            data.password = this.config.encryptText(req.body.password, 'KeepCoding');
            const randomNumber = Math.floor(100000 + Math.random() * 900000);
            data.OTP = randomNumber;
            data.time = date.getMinutes();
            const exist = localStorage.getItem('user1');
            if (exist) {
                localStorage.removeItem('user1')
            }
            const userJsonString = JSON.stringify(data);
            localStorage.setItem('user1', userJsonString);
            const user = localStorage.getItem('user1');
            mail.sendMail(data)
            return res.json({ User: " 6 degit OTP Send over Your Mail, Cheak and Varify before OTP Expire" })
        } catch (err) {
            console.log(err);
            return res.json(err)
        }
    }

    varify = async (req, res) => {
        const OTP = req.body.OTP;
        const user1 = localStorage.getItem('user1');
        const user = JSON.parse(user1);
        console.log("user from local Storage", user);
        // const file = user.avtar.name;
        const date = new Date();
        let current = date.getMinutes();
        console.log(current);
        if ((Math.abs(current - user.time)) <= 5) {
            // if (user.avtar) {
            //     const img = await cloudinary.uploader.upload(user.avtar.tempFilePath);
            //     user.avtar = img.url;
            //     user.publicId = img.public_id;
            //     user.secure_url = img.secure_url
            // }

            if (user.OTP == OTP) {
                delete user.OTP;
                const userData = await User.create(user);

                return res.json({ Varify: "Account Varified", Message: userData })
            }
            return res.json({ Messgae: "OTP not Matched" })

        } else {
            return res.json({ Message: "Sorry OTP Expires" })
        }


    }

    // for the Get All Data
    getAllUser = async (req, res) => {
        try {
            const user = await User.find({}).populate('memory', 'img').populate('post').populate('comments').populate('likes')
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
            cloudinary.uploader.destroy(user.publicId, (err, result) => {
                if (err) {
                    return res.json({ Message: `There is problem with deletion ${err}` })
                }
                return res.json({ message: "User deleted", user });
            })

        } catch (err) {
            console.error("Error during delete user", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    };

    // getSimple User
    getSimple = async (req, res) => {
        try {

            console.log("new path", __dirname);
            return res.json(await User.find({}));
        } catch (err) {
            console.log("there is Errror ", err);
        }
    }

    // for the Getting Indivisual User
    getUser = async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            return res.json({ User: user })
        } catch (err) {
            console.log("There is problem with Geting user", err);
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
    }

    isValidPassword = (password) => {
        const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
        return regex.test(password);
    };

    page = async (req, res) => {
        const user = await User.find({})
        console.log(user);
        return res.render('home', {
            userData: user
        })
    }

}

