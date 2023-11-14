import User from '../model/User.js';
import Friend from '../model/Friends.js'
export default class friendController {

    addFriend = async (req, res) => {
        try {
            const frnd = await User.findById(req.body.followNow);
            const byMe = await User.findById(req.body.byMe);

            if (frnd && byMe) {
                const relation = await Friend.findOne({
                    followNow: req.body.followNow,
                    byMe: req.body.byMe
                });

                if (relation) {
                    await frnd.follower.pull(relation._id);
                    await byMe.following.pull(relation._id);
                    frnd.save();
                    byMe.save();
                    relation.deleteOne();
                    return res.json({ Message: `now you UnFollow ${frnd.name}` })
                } else {
                    const myRelation = await Friend.create({
                        followNow: req.body.followNow,
                        byMe: req.body.byMe
                    })
                    frnd.follower.push(myRelation);
                    frnd.save();

                    byMe.following.push(myRelation);
                    byMe.save();
                    return res.json({ Message: `You follow ${frnd.name}` })
                }
            }
        } catch (err) {
            console.log("theree is error ", err);
            return;
        }
    }
}