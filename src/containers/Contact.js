import React from "react";
import profile_1 from "assets/images/contact_1.png";
import profile_2 from "assets/images/contact_2.jpg";

export default function Contact() {
  return (
    <div>
      <h2 className="header">聯絡我們</h2>
      <div className="contact-content">
        <div className="contact-left">
          <img
            className="profile"
            src={profile_1}
            alt="profile_milan"
            align="left"
          />
          <p className="contact-name">Hao-Yun Chuang</p>
          <p className="contact-text">
            NCCU Linguistics
            <br />
            milanochuang[at]gmail[dot]com
            <br />
          </p>
        </div>
        <div className="contact-right">
          <img
            className="profile"
            src={profile_2}
            alt="profile_et"
            align="left"
          />
          <p className="contact-name">Yi-Ting Tsai</p>
          <p className="contact-text">
            NCCU Linguistics
            <br />
            109555005[at]nccu[dot]edu[dot]tw
            <br />
          </p>
        </div>
      </div>
    </div>
  );
}
