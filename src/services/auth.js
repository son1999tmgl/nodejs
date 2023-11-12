import db from '../models'

export const register = () => new Promise((resolve, reject) => {
    try {
        resolve({
            err: -1,
            mes: 'success'
        })
        console.log('after resolve')
    } catch (error) {
        console.log('err');
        reject(error)
    }
})