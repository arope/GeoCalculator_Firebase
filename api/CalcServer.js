import axios from "axios";
import { CALC_KEY } from "./CALC_KEY";

const CalcServer = axios.create({
  baseURL: "http://api.openweathermap.org/data/2.5/weather",
});

CalcServer.interceptors.request.use(
  async (config) => {
    // called when request is made.
    config.headers.Accept = "application/json";
    // const token = await AsyncStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (err) => {
    // called when error
    return Promise.reject(err);
  }
);

export const getWeather = async (lat, lon, callback) => {
  const response = await CalcServer.get(
    `?lat=${lat}&lon=${lon}&units=imperial&appid=${CALC_KEY}`
    // `?lat=35&lon=139&units=imperial&appid=${CALC_KEY}`
  );
  callback(response.data);
};

// export const getWeather2 = async (callback) => {
//   const response = await CalcServer.get(
//     //  `?lat=${lat}&lon=${lon}&appid=${CALC_KEY}`
//     `?lat=20&lon=40&units=imperial&appid=${CALC_KEY}`
//   );
//   callback(response.data);
// };

export default CalcServer;
