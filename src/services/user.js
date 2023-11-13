import db from '../models'


export const getOne = (userId) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findByPk(userId,
            {
                attributes: {
                    exclude: ['password']
                }
            })
        resolve({
            err: response ? 0 : -1,
            mes: response ? 'Got' : 'user not found',
            useData: response
        })
    } catch (error) {
        console.log('err');
        reject(error)
    }
})
