import {Fragment} from "react";
import "../../components/Navigation_Bar/NavigationBar.css";

const Profile = () => {
    return (
        <Fragment>
            <div className="user-profile-page">
                <div className="main-div">
                    <div className="user-profile">
                        <div className="col-12 content-box">
                            <div className="profile-wrap">
                                <div className="profile">
                                    <div className="user-info">
                                        <div>
                                            <div>
                                                <p>firstname + lastname:</p>
                                                <p>email:</p>
                                            </div>
                                            <p>password:</p>
                                        </div>
                                        <div>
                                            <form action="\editprofile" method="get">
                                                <button className="profile-edit-btn">
                                                    Edit
                                                </button>
                                            </form>
                                        </div>

                                        <div>
                                            <form action="\editprofile" method="get">
                                                <button className="profile-edit-btn2">
                                                    My Orders
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment >
    );

};

export default Profile;