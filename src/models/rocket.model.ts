import axios from "axios";

export interface IRocket {
  id: string;
  block: number;
  flight_number: number;
  name: string;
  serial: string;
  isReused: { first_stage: boolean; second_stage: boolean };
  getOne(rocket_id: string): void;
}

export class Rocket implements IRocket {
  id: string;
  block: number;
  flight_number: number;
  name: string;
  serial: string;
  isReused: { first_stage: boolean; second_stage: boolean };

  constructor(rocket: IRocket | null = null) {
    this.id = rocket ? rocket.id : "";
    this.flight_number = rocket ? rocket.flight_number : 0;
    this.block = rocket ? rocket.block : 0;
    this.name = rocket ? rocket.name : "";
    this.serial = rocket ? rocket.serial : "";
    this.isReused = rocket
      ? rocket.isReused
      : { first_stage: false, second_stage: false };
  }

  public getOne(rocket_id: string): void {
    axios
      .get(`https://api.spacexdata.com/v4/rockets/${rocket_id}`)
      .then((response) => {
        const rocket = response.data;

        this.id = rocket.id;
        this.name = rocket.name;
        this.isReused = {
          first_stage: rocket.first_stage.reusable,
          second_stage: rocket.second_stage.reusable,
        };
      })
      .catch((err) => console.error(err.message));
  }
}
