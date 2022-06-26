import { IPad, Pad } from "./pad.model";
import axios from "axios";

export interface ILandpad extends IPad {
  type?: string;
  landings?: number;
  failures?: number;
  isAttempt: boolean;
  isSuccess: boolean;
}

export class Landpad extends Pad implements ILandpad {
  public type?: string;
  public landings?: number;
  public failures?: number;
  public isAttempt: boolean;
  public isSuccess: boolean;

  constructor() {
    super();
    this.isAttempt = false;
    this.isSuccess = false;
  }

  public getOne(landpad_id: string): void {
    axios
      .get(`https://api.spacexdata.com/v4/landpads/${landpad_id}`)
      .then((response) => {
        const landpad = response.data;

        this.name = landpad.name;
        this.about = landpad.details;
        this.type = landpad.type;
        this.locality = landpad.locality;
        this.region = landpad.region;
        this.landings = landpad.landing_attempts;
        this.success_rate = Math.round(
          (landpad.landing_successes / landpad.landing_attempts) * 100
        );
        this.failures = landpad.landing_attempts - landpad.landing_successes;

        super.getWeather(landpad.latitude, landpad.longitude);
      })
      .catch((err) => console.error(err.message));
  }
}
