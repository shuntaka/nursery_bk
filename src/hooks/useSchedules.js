// import { AsyncStorage } from "react-native";
// import axios from "../api/api";

// const fetchSchedules = async () => {
//   try {
//     const response = await axios.get("/schedules");
//     const schedules = response.data;

//     const schedulesWithAttendance = await Promise.all(
//       schedules.map(async schedule => {
//         const date = schedule.date;
//         // AsyncStorage.removeItem(date);
//         const attendanceString = await AsyncStorage.getItem(date);
//         const attendance = JSON.parse(attendanceString);

//         if (attendance !== null) {
//           return { ...schedule, attendance };
//         } else {
//           await AsyncStorage.setItem(date, "false");
//           return { ...schedule, attendance: false };
//         }
//       })
//     );
//     return schedulesWithAttendance;
//   } catch (err) {
//     console.log(err);
//   }
// };

// const incrementAttendee = async date => {
//   let originalSchedule = {};
//   try {
//     const result = await axios.get(`/schedules?date=${date}`);
//     originalSchedule = result.data[0];
//   } catch (err) {
//     console.log(err);
//   }

//   try {
//     const id = originalSchedule.id;
//     await axios.put(`/schedules/${id}`, {
//       ...originalSchedule,
//       attendee: ++originalSchedule.attendee
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

// const decrementAttendee = async date => {
//   let originalSchedule = {};
//   try {
//     const result = await axios.get(`/schedules?date=${date}`);
//     originalSchedule = result.data[0];
//   } catch (err) {
//     console.log(err);
//   }

//   try {
//     const id = originalSchedule.id;
//     await axios.put(`/schedules/${id}`, {
//       ...originalSchedule,
//       attendee: --originalSchedule.attendee
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

// const switchAttendance = async date => {
//   // const originalAttendance = await AsyncStorage.getItem(
//   //   date,
//   //   originalAttendanceString => JSON.parse(originalAttendanceString)
//   // );
//   const originalAttendanceString = await AsyncStorage.getItem(date);
//   const originalAttendance = JSON.parse(originalAttendanceString);
//   const newAttendance = !originalAttendance;
//   await AsyncStorage.setItem(date, newAttendance.toString());
// };
// export {
//   fetchSchedules,
//   incrementAttendee,
//   decrementAttendee,
//   switchAttendance
// };
