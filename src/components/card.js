const lastNumber = 1
const myMessage = (a) => {
    return ++a
}


const card = () => <h1>I'm card number {myMessage(lastNumber)}</h1>

export default card