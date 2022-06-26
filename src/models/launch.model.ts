import axios from "axios";
import { ILaunchpad, Launchpad } from "./launchpad.model";
import { ILandpad, Landpad } from "./landpad.model";
import { IRocket, Rocket } from "./rocket.model";
import { IPayload, Payload } from "./payload.model";

export interface ILaunch {
  name?: string;
  mission_picture?: string;
  description?: string;
  youtube_id?: string;
  date?: Date;
  payloads: IPayload[];
  launch_site?: ILaunchpad;
  landing_site?: ILandpad;
  rocket?: IRocket;
  getNextLaunch(): void;
}

export class Launch implements ILaunch {
  public name?: string;
  public mission_picture?: string;
  public description?: string;
  public youtube_id?: string;
  public date?: Date = undefined;
  public payloads: IPayload[] = [];
  public launch_site?: ILaunchpad = new Launchpad();
  public landing_site?: ILandpad = new Landpad();
  public rocket?: IRocket = new Rocket();

  public getNextLaunch(): void {
    axios
      .get(`https://api.spacexdata.com/v4/launches/next`)
      .then((response) => {
        const launch = response.data;

        this.name = launch.name;
        this.mission_picture = launch.links.patch.large;
        this.date = new Date(launch.date_utc);
        this.description = launch.details;
        this.youtube_id = launch.links.youtube_id;

        this.payloads = launch.payloads.map(
          (payload_id: string) => new Payload(payload_id)
        );

        this.launch_site?.getOne(launch.launchpad);

        if (this.landing_site && launch.cores[0].landpad) {
          this.landing_site?.getOne(launch.cores[0].landpad);

          this.landing_site.isAttempt = launch.cores[0].landing_attempt;
          this.landing_site.isSuccess = launch.cores[0].landing_success;
        }

        axios
          .get(`https://api.spacexdata.com/v4/cores/${launch.cores[0].core}`)
          .then((response) => {
            const core = response.data;

            if (this.rocket) {
              this.rocket?.getOne(launch.rocket);

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
