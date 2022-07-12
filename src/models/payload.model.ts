import axios from "axios";

export class Payload {
  public name?: string;
  public type?: string;
  public mass?: number;
  public target_orbit?: string;
  public reference_system?: string;
  public customers?: string[];
  public nationalities?: string[];
  public manufacturers?: string[];

  constructor(payload_id: string) {
    axios
      .get(`https://api.spacexdata.com/v4/payloads/${payload_id}`)
      .then((response) => {
        const payload = response.data;

        this.name = payload.name;
        this.type = payload.type;
        this.mass = payload.mass_kg;
        this.target_orbit = payload.orbit;
        this.reference_system = payload.reference_system;
        this.customers = payload.customers;
        this.nationalities = payload.nationalities;
        this.manufacturers = payload.manufacturers;
      })
      .catch((err) => console.error(err.message));
  }
}
