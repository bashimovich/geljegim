import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import {
  BASE_URL,
  axiosInstance,
  axiosInstance2,
} from "../../utils/axiosIntance";
import { Context } from "../../context/context";
import lang from "../../lang/home.json";
// import DOMPurify from "dompurify";
import parse from "html-react-parser";
import DOMPurify from "dompurify";

const Privacy = () => {
  const history = useHistory();
  const { dil } = useContext(Context);
  const path = useLocation();
  const user = JSON.parse(localStorage.getItem("userData"));
  const [privacy, setPrivacy] = useState();
  useEffect(() => {
    getPrivacy();
  }, []);
  const getPrivacy = () => {
    console.log(user);
    axiosInstance2
      .get("/privacy")
      .then((data) => {
        console.log(data?.data?.data);
        setPrivacy(data.data?.data);
      })
      .catch((err) => console.log(err));
  };

  const htmlFrom = (htmlString) => {
    const cleanHtmlString = DOMPurify.sanitize(htmlString, {
      USE_PROFILES: { html: true },
    });
    const html = parse(cleanHtmlString);
    return html;
  };
  return (
    <div className="w-full flex justify-center flex-wrap">
      {/* <h1 className="w-full text-center my-4 text-[24px] font-[900]">
        Ulanyş düzgünleri we agzalyk şertleri, gizlinlik syýasaty
      </h1> */}
      <div className="w-[70%] py-10 px-10">
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(privacy?.content_ru),
          }}
        />
      </div>
    </div>
  );
};

export default Privacy;