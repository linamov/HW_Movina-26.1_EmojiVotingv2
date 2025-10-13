const { useState, useEffect } = React;

function EmojiVoting() {
  const [emojis, setEmojis] = useState([
    { name: "😀", votes: 0 },
    { name: "😢", votes: 0 },
    { name: "😎", votes: 0 },
    { name: "😡", votes: 0 }
  ]);
  const [winners, setWinners] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('emojiVotesFunctional');
    if (saved) setEmojis(JSON.parse(saved));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('emojiVotesFunctional', JSON.stringify(emojis));
  }, [emojis]);

  const vote = (index) => {
    const newEmojis = [...emojis];
    newEmojis[index].votes += 1;
    setEmojis(newEmojis);
  };

  const showResults = () => {
    const maxVotes = Math.max(...emojis.map(e => e.votes));
    const top = emojis.filter(e => e.votes === maxVotes && maxVotes > 0);
    setWinners(top);
  };

  const clearResults = () => {
    const reset = emojis.map(e => ({ ...e, votes: 0 }));
    setEmojis(reset);
    setWinners([]);
    localStorage.removeItem('emojiVotesFunctional');
  };

  return (
    <div className="container">
      <h2 className="mb-3">Emoji Voting (Functional Component)</h2>
      <div className="mb-3">
        {emojis.map((emoji, index) => (
          <button key={index} className="btn btn-outline-primary me-2 mb-2" onClick={() => vote(index)}>
            {emoji.name} {emoji.votes}
          </button>
        ))}
      </div>
      <div className="mb-3">
        <button className="btn btn-success me-2" onClick={showResults}>Show Results</button>
        <button className="btn btn-danger" onClick={clearResults}>Clear Results</button>
      </div>
      <div>
        <h4>Winner(s):</h4>
        {winners.length === 0 && <p>No votes yet</p>}
        {winners.map((e, i) => (
          <p key={i}>{e.name} - {e.votes} votes</p>
        ))}
      </div>
    </div>
  );
}

ReactDOM.render(<EmojiVoting />, document.getElementById('root'));
