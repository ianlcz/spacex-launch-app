import { IPad, Pad } from "./pad.model";
import axios from "axios";

export interface ILandpad extends IPad {
  type: string | null;
  isAttempt: boolean;
  isSuccess: boolean;
}

export class Landpad extends Pad implements ILandpad {
  public type: string | null;
  public isAttempt: boolean;
  public isSuccess: boolean;

  constructor(landpad: ILandpad | null = null) {
    super();
    this.type = landpad ? landpad.type : null;
    this.isAttempt = landpad ? landpad.isAttempt : false;
    this.isSuccess = landpad ? landpad.isSuccess : false;
  }

  public getOne(landpad_id: string): void {
    axios
      .get(`https://api.spacexdata.com/v4/landpads/${landpad_id}`)
      .then((response) => {
        const landpad = response.data;

        this.name = landpad.name;
        this.type = landpad.type;
        this.locality = landpad.locality;
        this.region = landpad.region;

        super.getWeather(landpad.latitude, landpad.longitude);
      })
      .catch((err) => console.error(err.message));
  }
}
