import axios from "axios";

export interface IRocket {
  name?: string;
  description?: string;
  serial?: string;
  engine?: { type: string; version: string };
  block?: number;
  type?: string;
  stages?: number;
  boosters?: number;
  features?: { mass: number; height: number; diameter: number };
  isReused?: boolean;
  getOne(rocket_id: string): void;
}

export class Rocket implements IRocket {
  public name?: string;
  public description?: string;
  public serial?: string;
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
        this.engine = { type, version };
        this.type = rocket.type;
        this.stages = rocket.stages;
        this.boosters = rocket.boosters;
        this.features = {
          mass: rocket.mass.kg,
          height: rocket.height.meters,
          diameter: rocket.diameter.meters,
        };
        this.isReused = rocket.second_stage.reusable;
      })
      .catch((err) => console.error(err.message));
  }
}
