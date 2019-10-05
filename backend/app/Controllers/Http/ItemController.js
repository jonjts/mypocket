'use strict'

const Item = use('App/Models/Item')
const User = use('App/Models/User')
class ItemController {

    async get({ auth, params, response, request }) {
        let user = await auth.getUser()

        const { month, year } = request.get()
        console.log(month, year)

        const itens = await Item.find({ "userId": user._id })

        return await itens
    }

    async store({ auth, request }) {
        const data = request.only(["_id", "user"
            , "descricao", "data", "valor", "tipo",
            "categoria","created_at"])
        const item = await Item.create(data)

        let user = await auth.getUser()
        user = await User.findOne({ "_id": user._id })

        await user.itens.push(item)
        await user.save()
        return item
    }


}

module.exports = ItemController
