import axios from "axios";
import { ILaunchpad, Launchpad } from "./launchpad.model";
import { ILandpad, Landpad } from "./landpad.model";
import { IRocket, Rocket } from "./rocket.model";

export interface ILaunch {
  name: string;
  details: string;
  webcast: string;
  launchDate: Date;
  launchpad: ILaunchpad;
  landpad: ILandpad;
  rocket: IRocket;
  getNextLaunch(): void;
}

export class Launch implements ILaunch {
  public name: string;
  public details: string;
  public webcast: string;
  public launchDate: Date;
  public launchpad: ILaunchpad;
  public landpad: ILandpad;
  public rocket: IRocket;

  constructor(launch: ILaunch | null = null) {
    this.name = launch ? launch.name : "";
    this.details = launch ? launch.details : "";
    this.webcast = launch ? launch.webcast : "";
    this.launchpad = launch ? launch.launchpad : new Launchpad();
    this.landpad = launch ? launch.landpad : new Landpad();
    this.rocket = launch ? launch.rocket : new Rocket();
    this.launchDate = launch ? launch.launchDate : new Date();
  }

  public getNextLaunch(): void {
    axios
      .get(`https://api.spacexdata.com/v4/launches/next`)
      .then((response) => {
        const launch = response.data;

        this.launchDate = launch.date_utc;
        this.details = launch.details;
        this.webcast = launch.links.youtube_id;
        this.name = launch.name;

        if (launch.launchpad) this.launchpad.getOne(launch.launchpad);

        if (launch.rocket) {
          this.rocket.getOne(launch.rocket);

          this.rocket.flight_number = launch.flight_number;
        }

        if (launch.cores[0].landpad) {
          this.landpad.getOne(launch.cores[0].landpad);

          this.landpad.isAttempt = launch.cores[0].landing_attempt;
          this.landpad.isSuccess = launch.cores[0].landing_success;
        }

        axios
          .get(`https://api.spacexdata.com/v4/cores/${launch.cores[0].core}`)
          .then((response) => {
            const core = response.data;

            this.rocket.block = core.block;
            this.rocket.serial = core.serial;
          })
          .catch((err) => console.error(err.message));

        console.log(this);
      })
      .catch((err) => console.error(err.message));
  }
}
