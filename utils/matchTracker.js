// src/utils/matchTracker.js

export const recordMatchResult = (gameName, result, stats) => {
    const previousMatches = JSON.parse(localStorage.getItem("matches")) || [];
  
    const newMatch = {
      gameName,
      result,
      stats,
      date: new Date().toLocaleString(),
    };
  
    previousMatches.unshift(newMatch);
  
    if (previousMatches.length > 10) {
      previousMatches.pop();
    }
  
    localStorage.setItem("matches", JSON.stringify(previousMatches));
  };
  
  export const getMatchStats = () => {
    const matches = JSON.parse(localStorage.getItem("matches")) || [];
  
    let totalGames = matches.length;
    let totalWins = matches.filter((m) => m.result === "win").length;
    let totalLosses = matches.filter((m) => m.result === "loss").length;
    let totalDeaths = matches.reduce((acc, m) => acc + (m.stats?.deaths || 0), 0);
    let totalScore = matches.reduce((acc, m) => acc + (m.stats?.score || 0), 0);
  
    return {
      totalGames,
      totalWins,
      totalLosses,
      totalDeaths,
      totalScore,
    };
  };
  