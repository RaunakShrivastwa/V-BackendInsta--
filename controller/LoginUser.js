import User from "../model/User.js"

export default class AuthenticationClass {

    loginuser = async (req, res) => {
        const user = await User.findOne({ email: req.body.email })
        console.log(req.body);
        return res.json(user)
    }

    logout = (req, res) => {
        req.logout((user => {
            console.log(user)
        }))

        return res.json({ Message: `${local.user.name} logout Successfully!!!!` })

    }
}