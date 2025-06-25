import axios from "axios";
import { BASE_URL } from "../services/urls";

const instance = axios.create({ baseURL: BASE_URL })
export default instance