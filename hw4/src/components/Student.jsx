const Student = (props) => {
  return (
    <div>
      <h2>
        {props.name.first} {props.name.last}
      </h2>
      <strong>major: {props.major}</strong>
      <p>
        {props.name.first} is taking {props.numCredits} and is
        {props.fromWisconsin ? (
          <span> from Wisconsin</span>
        ) : (
          <span> not from Wisconsin</span>
        )}
      </p>

      {props.interests && (
        <>
          <p>They have {props.interests.length} including...</p>
          <ul>
            {props.interests.map((interest, index) => (
              <li key={index}>{interest}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Student;
