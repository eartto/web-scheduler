import { Model, DataTypes } from "sequelize";
import { sequelize } from "../utils/db";

class Timetable extends Model {}

Timetable.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    key: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    timetableName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    timetableDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    reservationType: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    restrictionDuration: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    restrictionFrequency: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: "timetable",
  },
);

export default Timetable;
