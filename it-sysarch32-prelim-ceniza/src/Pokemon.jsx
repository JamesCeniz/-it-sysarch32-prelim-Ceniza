
import "./index.css";

function Pokemon({ name, type, base, image, id, language }) {
  const baseStats = Object.entries(base);

  return (
    <div className="Pokemon">
      <img className="pic" alt=" " src={image} />
      <div className="info">
        <h2 className="id">{id}</h2>
        <h2 className="name">{name[language]}</h2>
        {type.length === 1 ? (
        <h2 className="type">Type: {type[0]}</h2>
      ) : (
        <>
          <h2 className="type">{type[0]}</h2>
          <h2 className="type2"> {type[1]}</h2>
        </>
      )}
      </div>
     <div className="base">
        <div>
          <p>HP: {base.HP}</p>
          <p>Attack: {base.Attack}</p>
          <p>Defense: {base.Defense}</p>
        </div>
        <div>
        <p>Sp. Attack: {base["Sp. Attack"]}</p>
        <p>Sp. Defense: {base["Sp. Defense"]}</p>
          <p>Speed: {base.Speed}</p>
        </div>
      </div>
   </div>
  );
}

export default Pokemon;