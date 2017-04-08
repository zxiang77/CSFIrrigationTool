/**
 * Created by zilixiang on 4/7/17.
 */
import { observable, action, computed } from "mobx";
import { matchIconsToStations, cumulativeDICV } from "../utils";
import { states } from "../states";
import format from "date-fns/format";

export default class AppStore {
    @observable firstUse = true;
    @observable location = null;
    @action setLocation = d=>{
        this.location = d;
    };
}