import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const [data, setData]=useState([]);
  useEffect(()=>{
    getMovie();
  },[])
  const getMovie = async ()=>{
    await axios.get(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    .then(res=>{
      setData(res);
    })
    .catch(error=>{
      console.log(error);
    })
  }
  console.log(data);


  return <div>
    <h1>{id}</h1>
  </div>;
};

export default Detail;
