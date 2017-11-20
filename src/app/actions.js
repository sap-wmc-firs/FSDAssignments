// action creator helper

export function incrementAction(value) {
    return {
        type: "INCREMENT",
        payload : {
            value: value
        }
    }
}

export default incrementAction;