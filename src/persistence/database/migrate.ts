import { migrator } from "./umzug";

require("ts-node/register");

export const migrate = () => migrator.up();
