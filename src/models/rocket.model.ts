import axios from "axios";
import { toCapitalize } from "@/utils";

export class Rocket {
  public name?: string;
  public description?: string;
  public configuration?: string;
  public serial?: string;
  public reuseCount?: number;
  public engine?: { type: string; version: string };
  public block?: number;
  public type?: string;
  public stages?: number;
  public boosters?: number;
  public features?: { mass: number; height: number; diameter: number };
  public isReused?: boolean;

  public getOne(rocket_id: string): void {
    axios
      .get(`https://api.spacexdata.com/v4/rockets/${rocket_id}`)
      .then((response) => {
        const rocket = response.data;
        const { type, version } = rocket.engines;

        this.name = rocket.name;
        this.description = rocket.description;
        this.configuration = toCapitalize(rocket.payloads.option_1);
        this.engine = { type: toCapitalize(type), version };
        this.type = rocket.type;
        this.stages = rocket.stages;
        this.boosters = rocket.boosters;
        this.features = {
          mass: rocket.mass.kg,
          height: rocket.height.meters,
          diameter: rocket.diameter.meters,
        };
        this.isReused =
          rocket.first_stage.reusable || rocket.second_stage.reusable;
      })
      .catch((err) => console.error(err.message));
  }
}
