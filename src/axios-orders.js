import axios from "axios";

const instance= axios.create({
    baseURL:'https://react-burgerbuilder-e15a7-default-rtdb.firebaseio.com/'
})

export default instance;