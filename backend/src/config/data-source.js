import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "mariadb",
  host: process.env.DATABASE_URL || "localhost",
  port: process.env.DATABASE_PORT || 3306,
  username: process.env.DATABASE_USER || "warehouse_user",
  password: process.env.DATABASE_PASSWORD || "warehouse_password",
  database: process.env.DATABASE_NAME || "warehouse",
  synchronize: true,
  entities: ["./entities/*.js"],
});

export async function initializeDb() {
  try {
    await dataSource.initialize();
    console.log("Connected to the database");
  } catch (err) {
    console.error("Error connecting to the database", err);
  }
}
