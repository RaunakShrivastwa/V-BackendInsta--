import User from "../model/User.js";
import SendOtp from "sendotp";
const sendOtp = new SendOtp('412846Ayc1dzxk5fR659215caP1');

export default class AuthenticationClass {

    loginuser = async (req, res) => {
        console.log(req.user);
        // const user = await User.findOne({ email: req.body.email })      
        return res.json(req.user)
    }

    logout = (req, res) => {
        const name=req.user.name;
        req.logout((user => {
            return res.json({ Message: `${name} logout Successfully!!!!` })
            
        }))

      

    }


    phoneOTP = (req,res)=>{
        sendOtp.send('+91 9508840645', 'PRIIND', '2345', (err,data)=>{
            if(err){
                return console.log(err);
            }
            return console.log(data);
        });
    
    }
}