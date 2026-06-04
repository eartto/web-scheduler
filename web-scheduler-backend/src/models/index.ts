import User from "./user";
import Timetable from "./timetable";

User.hasMany(Timetable);
Timetable.belongsTo(User);

User.sync();
Timetable.sync();

export default {
  User,
  Timetable,
};
