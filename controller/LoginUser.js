export default class AuthenticationClass {

    loginuser = (req, res) => {
        return res.json({ Message: 'User Login Successfully!!!!' })
    }

    logout = (req, res) => {
        req.logout((user => {
            console.log(user)
        }))

        return res.json({ Message: `${local.user.name} logout Successfully!!!!` })

    }
}