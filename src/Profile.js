import React from 'react';
import profileImg from './images/profile.JPG';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import './Profile.css';

const Profile = () => {
    return (
        <div className="profile">
            <img src={profileImg} alt="PI"></img>
            <div className="itemlist">
            <div className="itemlist__item"><DashboardIcon/><p>Dashboard</p></div>
            <div className="itemlist__item"><LocalActivityIcon/><p>Activities</p></div>
            <div className="itemlist__item"><AccountBoxIcon/><p>Profile</p></div>
            <div className="itemlist__item"><SettingsIcon/><p>Settings</p></div>
            <div className="itemlist__item"><ExitToAppIcon/><p>Logout</p></div>
            </div>
      </div>
    )
}

export default Profile
