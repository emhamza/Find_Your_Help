import React, { useState } from 'react';
import PropTypes from 'prop-types';

const RideInfoTable = ({ ridesData, openPopup, styles }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * 10;
  const endIndex = Math.min(startIndex + 10, ridesData.length);

  // Slice the ridesData array to display only the rides for the current page
  const displayedRides = ridesData.slice(startIndex, endIndex);

  const nextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  return (
    <div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Sr#</th>
            <th style={styles.th}>Ride#</th>
            <th style={styles.th}>Pick up Date</th>
            <th style={styles.th}>Pick up Time</th>
            <th style={styles.th}>Ride Status</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedRides.map((ride, index) => {
            const serialNumber = startIndex + index + 1;
            // Get the time string with seconds
            const timeWithSeconds = new Date(ride.date_time)
              .toLocaleTimeString('en-GB');

            // Extract the time string without seconds
            const timeWithoutSeconds = timeWithSeconds.split(':').slice(0, 2).join(':');

            return (
              <tr key={ride.id}>
                <td style={styles.td}>{serialNumber}</td>
                <td style={styles.td}>{ride.id}</td>
                <td style={styles.td}>
                  {new Date(ride.date_time).toLocaleDateString('en-GB')}
                </td>
                <td style={styles.td}>
                  {timeWithoutSeconds}
                </td>
                <td style={styles.td}></td>
                <td style={styles.td}>
                  <button onClick={() => openPopup(ride)} style={styles.button}>
                    More Info
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={design.pagination}>
        <button onClick={prevPage} disabled={currentPage === 1} style={{ ...styles.button, marginRight: '1rem' }}>Previous</button>
        <button onClick={nextPage} disabled={endIndex >= ridesData.length} style={styles.button}>Next</button>
      </div>
    </div>
  );
};

RideInfoTable.propTypes = {
  ridesData: PropTypes.array.isRequired,
  openPopup: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired,
};

export default RideInfoTable;

const design = {
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '-7%',
  }, 
}
