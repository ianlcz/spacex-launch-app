import axios from "axios";

export interface IPad {
  name: string | null;
  locality: string | null;
  region: string | null;
  weather: { name: string | null; temperature: number };
  getOne(pad_id: string, latitude?: number, longitude?: number): void;
}

enum UnitsType {
  METRIC = "metric",
  IMPERIAL = "imperial",
}

export class Pad implements IPad {
  public name: string | null;
  public locality: string | null;
  public region: string | null;
  public weather: { name: string | null; temperature: number };

  constructor(pad: IPad | null = null) {
    this.name = pad ? pad.name : null;
    this.locality = pad ? pad.locality : null;
    this.region = pad ? pad.region : null;
    this.weather = pad ? pad.weather : { name: null, temperature: 0 };
  }

  protected getWeather(
    latitude: number,
    longitude: number,
    units: UnitsType = UnitsType.METRIC
  ): void {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${process.env.VUE_APP_OPENWEATHER_API_KEY}`
      )
      .then((response) => {
        const weather = response.data;

        this.weather.name = weather.weather[0].main;
        this.weather.temperature = weather.main.temp;
      })
      .catch((err) => console.error(err.message));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getOne(pad_id: string): void {
    throw new Error("Method not implemented.");
  }
}
