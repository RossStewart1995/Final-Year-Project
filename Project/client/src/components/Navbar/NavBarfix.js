import React, {useState, useEffect} from 'react'
import {Link, useHistory, useLocation} from "react-router-dom";
import {SidebarData} from "./SideBarData";
import "./NavBar.css";
import {IconContext} from "react-icons";
import * as CgIcons from "react-icons/cg";
import {useDispatch} from "react-redux";
import {LOGOUT, CLEAR} from "../../constants/actionTypes";
import decode from "jwt-decode";
import logo from "../../images/voiceit.PNG";
import { useSnackbar } from 'notistack';



const NavBarfix = () => {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [sidebar, setSideBar] = useState(false);

    const showSideBar = () => setSideBar(!sidebar);

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

    useEffect(() => {
        console.log(user);
        const token = user?.token;
        console.log(location.pathname)

        if(token){
            const decodedToken = decode(token);
            console.log(decodedToken);

        if(decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
        }

        setUser(JSON.parse(localStorage.getItem("profile")));

    }, [dispatch, location]);

    const handleLogout = () => {
      try{
        dispatch({ type: LOGOUT })
        enqueueSnackbar("Timed out, Account logged out", {
          variant: 'info'
      });
      }catch(error){
        enqueueSnackbar(`Logout Failed`, {
          variant: 'error'
        });
        throw error;
      }
        dispatch({type: CLEAR})
        history.push("/auth");
    };


    const handleClear = (value) => {
        console.log(value.title);
        console.log(value.path);
        
        if(value.path !== location.pathname){
          if (value.path === "/") {
            dispatch({ type: CLEAR });
            history.push("/");
          }
          if (value.path === "/account") {
            dispatch({ type: CLEAR });
            history.push("/account");
          }
          if (value.path === "/poll") {
            dispatch({ type: CLEAR });
            history.push("/poll");
          }
          if (value.path === "/auth") {
            try{
              dispatch({ type: LOGOUT })
              enqueueSnackbar("User Logged Out", {
                variant: 'info'
            });
            }catch(error){
              enqueueSnackbar(`Logout Failed`, {
                variant: 'error'
              });
              throw error;
            }
            dispatch({ type: CLEAR });
            history.push("/auth");
          }
        }
        
    }
    

    return (
        <>
          <IconContext.Provider value={{ color: '#fff', size: "25px"}}>
            
                <div className='navbar'>
                    {user ? (
                      <>
                        <Link to='#' className='menu-bars'>
                        <CgIcons.CgMenuRound onClick={showSideBar} />
                        </Link>
                        <img className="logo-heading" src={logo}/>
                        </>
                    ) : (<></>)}
                
              </div>
              <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showSideBar}>
                  <li className='navbar-toggle'>
                    <Link to='#' className='menu-bars'>
                      <CgIcons.CgCloseO />
                    </Link>
                  </li>
                  {SidebarData.map((item, index) => {
                    return (
                      <li key={index} className={item.cName} onClick={ ()=> handleClear(item) }>
                        <Link to={item.path}>
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            
            
          </IconContext.Provider>
                
        
        </>
      );
    }
    

export default NavBarfix
