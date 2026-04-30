import { DataSource } from "typeorm";

import { APIKey } from "./schema/db/apiKey";
import { Cereal } from "./schema/db/cereal";
import { User } from "./schema/db/user";

const AppDataSource = await new DataSource({
  type: "sqlite",
  database: "./cereals.db",
  entities: [Cereal, APIKey, User],
}).initialize();

export default AppDataSource;
