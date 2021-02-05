import {Service, Container} from "typedi";
import BService from "./BService";

@Service()
class AService {

    constructor(
        private bService: BService
    ) {}


    test() {
        return this.bService.test()
    }



}

export default AService