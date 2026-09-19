import { StateClass } from "asnow-lib";

export default class AppClass extends StateClass {
    constructor(state, setState) {
        super(state, setState);
        this.initState({ app: null });
    }

    static init(state, setState) {
        return new AppClass(state, setState);
    }
}