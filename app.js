const { useState, useEffect } = React;
function EmojiVotingApp() {
  const initialVotes = JSON.parse(localStorage.getItem("emojiVotesHooks")) || {
    "😊": 0,
    "😎": 0,
    "🤩": 0,
    "😂": 0
  };

  const [votes, setVotes] = useState(initialVotes);
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    localStorage.setItem("emojiVotesHooks", JSON.stringify(votes));
  }, [votes]);

  const handleVote = (emoji) => {
    setVotes((prev) => ({ ...prev, [emoji]: prev[emoji] + 1 }));
  };

  const showResults = () => {
    const maxVotes = Math.max(...Object.values(votes));
    const top = Object.entries(votes).filter(([_, count]) => count === maxVotes);
    setWinners(top);
  };

  const clearResults = () => {
    const reset = Object.keys(votes).reduce((acc, key) => ({ ...acc, [key]: 0 }), {});
    setVotes(reset);
    setWinners([]);
    localStorage.removeItem("emojiVotesHooks");
  };

  return (
    <div className="container p-4 bg-white rounded shadow" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4 text-primary">Emoji Voting App (Hooks)</h2>
      <div className="d-flex justify-content-around mb-4">
        {Object.entries(votes).map(([emoji, count]) => (
          <div key={emoji} className="text-center">
            <button
              className="btn btn-lg btn-outline-primary mb-2"
              onClick={() => handleVote(emoji)}
            >
              {emoji}
            </button>
            <p>{count} votes</p>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center gap-3">
        <button className="btn btn-success" onClick={showResults}>
          Show Results
        </button>
        <button className="btn btn-danger" onClick={clearResults}>
          Clear Results
        </button>
      </div>

      {winners.length > 0 && (
        <div className="mt-4">
          <h4>🏆 Winner{winners.length > 1 ? "s" : ""}:</h4>
          {winners.map(([emoji, count]) => (
            <p key={emoji} style={{ fontSize: "2rem" }}>
              {emoji} — {count} votes
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<EmojiVotingApp />);
