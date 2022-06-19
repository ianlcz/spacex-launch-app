import { IPad, Pad } from "./pad.model";
import axios from "axios";

export interface ILaunchpad extends IPad {
  full_name: string | null;
}

export class Launchpad extends Pad implements ILaunchpad {
  public full_name: string | null;

  constructor(launchpad: ILaunchpad | null = null) {
    super();
    this.full_name = launchpad ? launchpad.full_name : null;
  }

  public getOne(launchpad_id: string): void {
    axios
      .get(`https://api.spacexdata.com/v4/launchpads/${launchpad_id}`)
      .then((response) => {
        const launchpad = response.data;

        this.full_name = launchpad.full_name;
        this.locality = launchpad.locality;
        this.name = launchpad.name;
        this.region = launchpad.region;

        super.getWeather(launchpad.latitude, launchpad.longitude);
      })
      .catch((err) => console.error(err.message));
  }
}
