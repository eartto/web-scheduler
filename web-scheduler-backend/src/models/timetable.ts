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
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
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
      type: DataTypes.TEXT,
      allowNull: true,
    },
    restrictionFrequency: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    key: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: "timetable",
  },
);

Timetable.sync();

export default Timetable;