import axios from "axios";
import { Pad } from "./pad.model";

export class Landpad extends Pad {
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
        this.geographic_coordinates.latitude = landpad.latitude;
        this.geographic_coordinates.longitude = landpad.longitude;
        this.landings = landpad.landing_attempts;
        this.success_rate = Math.round(
          (landpad.landing_successes / landpad.landing_attempts) * 100
        );
        this.failures = landpad.landing_attempts - landpad.landing_successes;

        super.getWeather();
      })
      .catch((err) => console.error(err.message));
  }
}
