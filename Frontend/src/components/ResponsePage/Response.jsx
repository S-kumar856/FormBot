// import React from "react";

// import style from "./Response.module.css";
// import { Chart } from "react-google-charts";

// export const data = [
//   ["Task", "Hours per Day"],
//   ["Work", 11],
//   ["Eat", 2],
//   ["Commute", 2],
//   ["Watch TV", 2],
//   ["Sleep", 7], // CSS-style declaration
// ];

// export const options = {
//   title: "My Daily Activities",
//   pieHole: 0.4,
//   is3D: false,
// };

// const Response = ({ forms }) => {
//   console.log(forms);
//   return (
//     <div>
//       <div className={style.container}>
//         {forms.map((item) => (
//           <div className={style.div} key={item._id}>
//             <div className={style.response}>
//               <h3>views</h3>
//               <p>{item.viewCount}</p>
//             </div>
//             <div className={style.response}>
//               <h3>started</h3>
//               <p>{item.startedCount}</p>
//             </div>
//             <div className={style.response}>
//               <h3>submitted</h3>
//               <p>{item.submittedCount}</p>
//             </div>
//             <table>
//             {
//                 item.fields.map((field) => {
//                     return (
//                     <tr key={field._id}>
//                         <th>{field.label}</th>
//                     </tr>
//                     );
//                 })
//             }
//         </table>
//           </div>
//         ))}
//       </div>

//       <div className="table">
        
//       </div>
//       <Chart
//       chartType="PieChart"
//       width="100%"
//       height="400px"
//       data={data}
//       options={options}
//     />
//       <div className={style.responsesData}></div>
//     </div>
//   );
// };

// export default Response;

// DashboardReplica.js
import React from "react";
import styles from "./Response.module.css";

const DashboardReplica = () => {
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.statsContainer}>
        <div className={styles.statBox}>
          <p>Views</p>
          <h2>6</h2>
        </div>
        <div className={styles.statBox}>
          <p>Starts</p>
          <h2>100</h2>
        </div>
      </div>

      <table className={styles.dataTable}>
        <thead>
          <tr>
            <th>Submitted at</th>
            <th>Button 1</th>
            <th>Text</th>
            <th>Button 2</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Jul 17, 03:23 PM</td>
            <td>Hi!</td>
            <td>abc@g.com</td>
            <td>alpha</td>
            <td>5</td>
          </tr>
          <tr>
            <td>Jul 17, 02:48 PM</td>
            <td>Hi!</td>
            <td>fsdfasd</td>
            <td>-</td>
            <td>3</td>
          </tr>
          <tr>
            <td>Jul 14, 04:25 PM</td>
            <td>Hi!</td>
            <td>-</td>
            <td>Studio App to Manage Clients, Tracking App for Clients</td>
            <td>4</td>
          </tr>
        </tbody>
      </table>

      <div className={styles.chartContainer}>
        <div className={styles.donutChart}></div>
        <div className={styles.completionStats}>
          <h3>Completed</h3>
          <h2>33</h2>
          <p>Completion Rate</p>
          <h2>33%</h2>
        </div>
      </div>
    </div>
  );
};

export default DashboardReplica;
