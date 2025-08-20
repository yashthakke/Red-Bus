
//hook useStart

import axios from "axios";
import { useEffect, useState } from "react";

export const useFetchApi = (url) => {
  //api
  const [data, setdata] = useState([]);
  const [loding, setloding] = useState(false);

  const callApi = async () => {
    setloding(true);
    const res = await axios.get(url);
    setdata(res.data.products);
    setloding(false);
  };

  useEffect(() => {
    callApi();
  }, []);

  return { data, loding };
};