export const defferCall = (func: any, timeout = 500, args: any = {}) =>
    new Promise(resolve => {
        setTimeout(() => {
            func(args)
            resolve(null)
        }, timeout)
    })
