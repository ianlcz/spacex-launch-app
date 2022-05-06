import axios from "axios";

export interface ILaunchpad {
  full_name: string;
  locality: string;
  name: string;
  region: string;
  getOne(launchpad_id: string): void;
}

export class Launchpad implements ILaunchpad {
  public full_name: string;
  public locality: string;
  public name: string;
  public region: string;

  constructor(launchpad: ILaunchpad | null = null) {
    this.full_name = launchpad ? launchpad.full_name : "";
    this.locality = launchpad ? launchpad.locality : "";
    this.name = launchpad ? launchpad.name : "";
    this.region = launchpad ? launchpad.region : "";
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
      })
      .catch((err) => console.error(err.message));
  }
}
