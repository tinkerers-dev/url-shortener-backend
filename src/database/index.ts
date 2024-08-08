import mongoose from "mongoose";
import chalk from "chalk";
import { exit } from "process";

const connectToDataBase = async (dataBaseUrl: string): Promise<void> => {
  try {
    await mongoose.connect(dataBaseUrl);

    console.log(chalk.greenBright("Gracefully connected to Database "));
  } catch (error) {
    const errorMessage = (error as { message: string }).message;

    console.log(
      chalk.bgRed.white.bold(
        `"Failed to connect to DataBase: "${errorMessage}`,
      ),
    );

    exit(1);
  }
};

export default connectToDataBase;
