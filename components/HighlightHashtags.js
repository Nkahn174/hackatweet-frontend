


function HighlightHashtags({ msg }) {
  // On split le texte en morceaux, en gardant les hashtags
  const parts = msg.split(/(\#[^\s#]+)/g);

  return (
    <p>
      {parts.map((part, i) =>
        part.startsWith('#') ? (
          <span key={i} style={{ color: '#347ac2' }}>
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </p>
  );
}

export default HighlightHashtags