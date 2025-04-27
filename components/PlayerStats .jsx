// import { useEffect, useState } from 'react';

// function PlayerStats({ playerId }) {
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const getStats = async (playerId) => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/game/stats/${playerId}`);
//       if (!res.ok) throw new Error('Failed to fetch stats');
//       const data = await res.json();
//       setStats(data);
//     } catch (err) {
//       console.error('Error fetching stats:', err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getStats(playerId);
//   }, [playerId]);

//   if (loading) return <p>Loading stats...</p>;
//   if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
//   if (!stats) return null;

//   return (
//     <div className="card">
//       <h2>🎮 Game Stats</h2>
//       <p><strong>Wins:</strong> {stats.wins}</p>
//       <p><strong>Losses:</strong> {stats.losses}</p>
//       <p><strong>Level:</strong> {stats.level}</p>
//     </div>
//   );
// }

// export default PlayerStats;
