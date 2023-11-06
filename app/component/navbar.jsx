import { Link } from "@remix-run/react";
import { useEffect } from "react";

const Navbar = () => {

  useEffect(() => {
    console.log(window.location.pathname == "/")
    window.addEventListener("scroll", function () {
      if (window.location.pathname == "/") {
        if (window.scrollY >= 50) {
          document.getElementById('nav').style.backgroundColor = "white";
          document.getElementById('nav').classList = "white-nav navbar";
        } else {
          document.getElementById('nav').style.backgroundColor = "transparent";
          document.getElementById('nav').classList = "navbar";
        }
      } else {
        document.getElementById('nav').style.backgroundColor = "white";
        document.getElementById('nav').classList = "white-nav navbar";
      }
    });
  })

  return (
    <>
      <div className="navbar white-nav " id="nav">

        <div className="menu-bar" onClick={() => {
          document.getElementById("sidebar").classList = "gs-sidebar"
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 4H21V6H3V4ZM3 11H15V13H3V11ZM3 18H21V20H3V18Z"></path></svg>
        </div>

        <div className="logo">
          <h2>Pie</h2>
        </div>
        <div className="navigation">

          <Link to={"/"}>Home</Link>
          <Link to={"../products"}>Products</Link>
          <a href="#">Cat 1</a>
          <a href="#">Cat 2</a>
          <a href="#">Cat 3</a>
          <a href="#">Cat 4</a>
          <a href="#">Contacts</a>
        </div>
        <div className="icons">
          <Link to={"../login"}>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-person"
              viewBox="0 0 16 16"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
            </svg>
          </Link>


          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            className="bi bi-bag"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
          </svg>
        </div>
      </div>

      <div className="gs-sidebar gs-sidebar-no" id="sidebar" >
        <p onClick={() => {
          document.getElementById("sidebar").classList = "gs-sidebar gs-sidebar-no"
        }} className="close-x">X <span>Close</span> </p>

        <ul className="nav">
          <li><a href="">Home</a></li>
          <li><a href="">About</a></li>
          <li><a href="">Products</a></li>
          <li><a href="">Cart</a></li>
          <li><a href="">Contact</a></li>
        </ul>

        <p className="sidebar-email">
          <svg style={{
            width: '16px',
            margin: '-3px 10px',
          }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z"></path></svg>
          mail@gmail.com</p>


      </div >

    </>
  );
};
export default Navbar;
