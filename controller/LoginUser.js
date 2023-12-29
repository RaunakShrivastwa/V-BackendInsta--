import User from "../model/User.js"

export default class AuthenticationClass {

    loginuser = async (req, res) => {
        // const user = await User.findOne({ email: req.body.email })      
        return res.json({LoginSuccessfull:`Thanks For Login , Use Functionality!!!!!!`})
    }

    logout = (req, res) => {
        const name=req.user.name;
        req.logout((user => {
            return res.json({ Message: `${name} logout Successfully!!!!` })
            
        }))

      

    }
}