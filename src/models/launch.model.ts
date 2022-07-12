import axios from "axios";
import { Launchpad } from "./launchpad.model";
import { Landpad } from "./landpad.model";
import { Rocket } from "./rocket.model";
import { Payload } from "./payload.model";

export class Launch {
  public name?: string;
  public mission_picture?: string;
  public description?: string;
  public youtube_id?: string;
  public date?: Date = undefined;
  public payloads: Payload[] = [];
  public launch_site: Launchpad = new Launchpad();
  public landing_site?: Landpad = new Landpad();
  public rocket?: Rocket = new Rocket();

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
              this.rocket.reuseCount = core.reuse_count;
            }
          })
          .catch((err) => console.error(err.message));

        console.log(this);
      })
      .catch((err) => console.error(err.message));
  }
}
