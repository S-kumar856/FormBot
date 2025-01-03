
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
