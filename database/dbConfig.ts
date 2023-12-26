import { connect } from "mongoose";
import { envs } from "../utils/envs";

const DBURL = envs.dbUrl;

export const dbConnection = async () => {
  await connect(DBURL).then(() => {
    console.log("DataBase is Connected");
  });
};
