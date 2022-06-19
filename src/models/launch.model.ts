import { ILaunchpad, Launchpad } from "./launchpad.model";
import { ILandpad, Landpad } from "./landpad.model";
import { IRocket, Rocket } from "./rocket.model";
import axios from "axios";

export interface ILaunch {
  name: string | null;
  mission_picture: string | null;
  details: string | null;
  youtube_id: string | null;
  date: Date;
  launchpad: ILaunchpad | null;
  landpad: ILandpad | null;
  rocket: IRocket | null;
  getNextLaunch(): void;
}

export class Launch implements ILaunch {
  public name: string | null;
  public mission_picture: string | null;
  public details: string | null;
  public youtube_id: string | null;
  public date: Date;
  public launchpad: ILaunchpad | null;
  public landpad: ILandpad | null;
  public rocket: IRocket | null;

  constructor(launch: ILaunch | null = null) {
    this.name = launch ? launch.name : null;
    this.mission_picture = launch ? launch.mission_picture : null;
    this.details = launch ? launch.details : null;
    this.youtube_id = launch ? launch.youtube_id : null;
    this.launchpad = launch ? launch.launchpad : new Launchpad();
    this.landpad = launch ? launch.landpad : new Landpad();
    this.rocket = launch ? launch.rocket : new Rocket();
    this.date = launch ? launch.date : new Date();
  }

  public getNextLaunch(): void {
    axios
      .get(`https://api.spacexdata.com/v4/launches/next`)
      .then((response) => {
        const launch = response.data;

        this.name = launch.name;
        this.mission_picture = launch.links.patch.large;
        this.date = new Date(launch.date_utc);
        this.details = launch.details;
        this.youtube_id = launch.links.youtube_id;

        if (this.launchpad) this.launchpad.getOne(launch.launchpad);

        if (this.landpad && launch.cores[0].landpad) {
          this.landpad.getOne(launch.cores[0].landpad);

          this.landpad.isAttempt = launch.cores[0].landing_attempt;
          this.landpad.isSuccess = launch.cores[0].landing_success;
        }

        axios
          .get(`https://api.spacexdata.com/v4/cores/${launch.cores[0].core}`)
          .then((response) => {
            const core = response.data;

            if (this.rocket) {
              this.rocket.getOne(launch.rocket);

              this.rocket.flight_number = launch.flight_number;
              this.rocket.block = core.block;
              this.rocket.serial = core.serial;
            }
          })
          .catch((err) => console.error(err.message));

        console.log(this);
      })
      .catch((err) => console.error(err.message));
  }
}
