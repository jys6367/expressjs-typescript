import {Service, Container} from "typedi";


@Service()
class BService {

    constructor() {
    }

    test() {
        return 100
    }


}

export default BService
