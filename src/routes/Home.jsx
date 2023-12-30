import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Movies({ id, src, title, summary, genres }) {
  const navigate = useNavigate();
  const titleClick = (props) => {
    navigate(`/movie/${props}`)
  }
  return (
    <div>
      <img src={src} alt="" />
      <h2 onClick={() => titleClick(id)}>{title}</h2>
      <p>
        {summary !== ""
          ? summary.length > 235
            ? `${summary.slice(0, 235)}...`
            : summary
          : `Nothing`}
      </p>
      <ul>
        {genres.map((g) => (
          <li key={g}>{g}</li>
        ))}
      </ul>
    </div>
  );
}

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const uploadMovies = async () => {
    await axios
      .get(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`
      )
      .then((Array) => {
        setMovies(Array.data.data.movies);
        setLoading(false);
      });
  };
  useEffect(() => {
    uploadMovies();
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {movies.map((item) => (
            <>
              <Movies
                key={item.id}
                id={item.id}
                src={item.medium_cover_image}
                title={item.title}
                summary={item.summary}
                genres={item.genres}
              />
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
