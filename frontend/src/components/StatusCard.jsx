import React from 'react';

const StatusCards = ({ data }) => {
  const thresholds = { DO: 5, BOD: 3, Nitrate: 10, FecalColiform: 500 };
  if (!data || data.length === 0) return null;

  const latest = data[data.length - 1];

  const getColor = (param, value) => {
    switch (param) {
      case 'DO':
        return value < thresholds.DO ? '#ff4d4f' : '#52c41a';
      case 'BOD':
        return value > thresholds.BOD ? '#ff4d4f' : '#52c41a';
      case 'Nitrate':
        return value > thresholds.Nitrate ? '#ff4d4f' : '#52c41a';
      case 'FecalColiform':
        return value > thresholds.FecalColiform ? '#ff4d4f' : '#52c41a';
      default:
        return '#d9d9d9';
    }
  };

  return (
    <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
      {Object.entries(latest.parameters).map(([key, value]) => (
        <div
          key={key}
          style={{
            flex: '1 1 150px',
            background: getColor(key, value),
            color: '#fff',
            padding: '15px',
            borderRadius: '10px',
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          <h4>{key}</h4>
          <p>{value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatusCards;
