import { v2 as cloudinary } from 'cloudinary';
import User from '../model/User.js';
import Memory from '../model/Memory.js'
cloudinary.config({
    cloud_name: 'dzhl7dmsp',
    api_key: '323466687184448',
    api_secret: 't8YR62TWigv3q2gTHL3mtIoTVzM'
});
export default class memoryController {
    addMemory = async (req, res) => {
        const userId = req.params.id;
        try {
            const user = await User.findById(userId);
            if (user) {
                const mImg = req.files.img;
                const image = await cloudinary.uploader.upload(mImg.tempFilePath);
                const memory = await Memory.create({
                    user: userId,
                    img: image.url,
                    public_id: image.public_id
                });
                user.memory.push(memory);
                user.save();
                return res.json({ Memory: memory })
            } else {
                return res.json({ Error: 'Invalide User' })
            }
        } catch (err) {
            console.log("There is problem with code plz cheak ", err);
            return;
        }
    }

    getAllMemory = async (req, res) => {
        try {
            const memory = await Memory.find({})
            return res.json({ Memory: memory });
        } catch (err) {
            console.log("there is error with finding memory ", err);
            return;

        }
    }

    getParticular = async (req, res) => {
        try {
            const userId = req.params.id;
            const memory = await Memory.find({ user: userId });
            return res.json({ Memory: memory })
        } catch (err) {
            console.log("There is Error ", err);
            return;
        }
    }

    deleteMemory = async (req, res) => {

    }
}