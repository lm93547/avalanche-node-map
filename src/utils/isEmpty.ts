export const isEmpty = (empty: {}) => {
    return Object.keys(empty).length === 0 && empty.constructor === Object
}