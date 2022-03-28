import React from 'react';
import "../master.css"

const Footer = () => {
  return (
    // </div>
    <footer className="site-footer">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-12">
              <h6 style={{color: 'gold'}}>About</h6>
              <p className="text-justify">
                this is one of my personal projects. i started to make this after i learnt web dev and i was inspired by those codeforces ladders and wanted to create a simple way of making all dsa list sheets available to you guys. i hope it helps.
              </p>
            </div>
        </div>
          <hr />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-sm-6 col-xs-12">
              <p className="copyright-text">Copyright © 2021 All Rights Reserved by  
                <a href="/"> <span style={{textDecoration: "underline"}} >DSA Sheets</span></a>.
              </p>
            </div>
            <div className="col-md-4 col-sm-6 col-xs-12">
              <ul className="social-icons">
                <li><a className="twitter" href="https://github.com/DevMeena"><i className="fab fa-github" /></a></li>
                <li><a className="linkedin" href="https://www.linkedin.com/in/dev-meena-00bb7820b/"><i className="fab fa-linkedin" /></a></li>   
              </ul>
            </div>
          </div>
        </div>
      </footer>
  )
};

export default Footer;
