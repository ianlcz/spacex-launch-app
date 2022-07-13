import axios from "axios";

export abstract class Pad {
  public name?: string;
  public about?: string;
  public locality?: string;
  public region?: string;
  public success_rate?: number;
  protected weather: {
    name: string | null;
    temperature: number;
    wind_speed: number;
  } = {
    name: null,
    temperature: 0,
    wind_speed: 0,
  };

  protected getWeather(latitude: number, longitude: number): void {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.VUE_APP_OPENWEATHER_API_KEY}`
      )
      .then((response) => {
        const weather = response.data;

        this.weather.name = weather.weather[0].main;
        this.weather.temperature = Math.round(weather.main.temp);
        this.weather.wind_speed = Number((weather.wind.speed * 3.6).toFixed(1));
      })
      .catch((err) => console.error(err.message));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getOne(pad_id: string): void {
    throw new Error("Method not implemented.");
  }
}
