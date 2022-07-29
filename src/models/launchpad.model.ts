import axios from "axios";
import { Pad } from "./pad.model";

export class Launchpad extends Pad {
  public full_name?: string;
  public launches?: number;

  constructor() {
    super();
  }

  public getOne(launchpad_id: string): void {
    axios
      .get(`https://api.spacexdata.com/v4/launchpads/${launchpad_id}`)
      .then((response) => {
        const launchpad = response.data;

        this.full_name = launchpad.full_name;
        this.about = launchpad.details;
        this.locality = launchpad.locality;
        this.name = launchpad.name;
        this.region = launchpad.region;
        this.geographic_coordinates.latitude = launchpad.latitude;
        this.geographic_coordinates.longitude = launchpad.longitude;
        this.launches = launchpad.launch_attempts + 1;
        this.success_rate = Math.round(
          (launchpad.launch_successes / launchpad.launch_attempts) * 100
        );
        super.getWeather();
      })
      .catch((err) => console.error(err.message));
  }
}
