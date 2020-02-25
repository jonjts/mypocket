'use strict'

const User = use('App/Models/Security/User')

class ItemController {

    async index({ auth, request }) {
        const now = new Date()
        const {
            limit,
            page,
            month = (now.getMonth() + 1),
            year = now.getFullYear()
        } = request.all()
        const user = await auth.getUser()

        return await user
            .itens()
            .whereNull('deleted_at')
            .whereRaw(`(date_part('month', realizado_em) = ${month} AND date_part('year', realizado_em) = ${year})`)
            .orderBy('realizado_em', 'DESC')
            .paginate(page || 1, limit || 30)
    }

    async store({ auth, request }) {
        try {
            const data = request.only([
                "id",
                "user_id",
                "categoria_id",
                "descricao",
                "realizado_em",
                "updated_at",
                "valor",
                "tipo",])

            const user = await auth.getUser()
            const item = await user.itens().create({
                ...data,
                updated_at: data.updated_at ? data.updated_at : new Date()
            })

            return item
        } catch (error) {
            console.error(error)
        }
    }

    async update({ auth, request, params }) {
        try {
            const { id } = params
            const data = request.only([
                "categoria_id",
                "descricao",
                "realizado_em",
                "updated_at",
                "valor",
                "tipo",])

            const user = await auth.getUser()
            const item = await user.itens()
                .where({ id })
                .update({
                    ...data,
                    updated_at: data.updated_at ? data.updated_at : new Date()
                })

            return await user.itens().where({ id }).first()
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async delete({ auth, request, params }) {
        try {
            const { id } = params

            const user = await auth.getUser()
            const item = await user.itens()
                .where({ id })
                .update({
                    deleted_at: new Date()
                })

            return await user.itens().where({ id }).first()
        } catch (error) {
            console.error(error)
            throw error
        }
    }

}

module.exports = ItemController
