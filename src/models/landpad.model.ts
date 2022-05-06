import axios from "axios";

export interface ILandpad {
  name: string;
  type: string;
  isAttempt: boolean;
  isSuccess: boolean;
  getOne(landpad_id: string): void;
}

export class Landpad implements ILandpad {
  public name: string;
  public type: string;
  public isAttempt: boolean;
  public isSuccess: boolean;

  constructor(landpad: ILandpad | null = null) {
    this.name = landpad ? landpad.name : "";
    this.type = landpad ? landpad.type : "";
    this.isAttempt = landpad ? landpad.isAttempt : false;
    this.isSuccess = landpad ? landpad.isSuccess : false;
  }

  public getOne(landpad_id: string): void {
    axios
      .get(`https://api.spacexdata.com/v4/landpads/${landpad_id}`)
      .then((response) => {
        const landpad = response.data;

        this.name = landpad.name;
        this.type = landpad.type;
      })
      .catch((err) => console.error(err.message));
  }
}
