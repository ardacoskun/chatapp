import React, { useState, useEffect } from "react";
import Img from "../assets/vecihi.jpg";
import Camera from "./Camera";
import ProfileNavbar from "./ProfileNavbar";
import { storage, db, auth } from "../firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "@firebase/storage";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router";

const Profile = () => {
  const [img, setImg] = useState("");
  const [user, setUser] = useState();
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data());
      }
    });

    if (img) {
      const uploadImg = async () => {
        const imgRef = ref(
          storage,
          `profileimage/${new Date().getTime()}-${img.name}`
        );
        try {
          if (user.profilePicPath) {
            await deleteObject(ref(storage, user.profilePicPath));
          }
          const snap = await uploadBytes(imgRef, img);
          const url = await getDownloadURL(ref(storage, imgRef));

          await updateDoc(doc(db, "users", auth.currentUser.uid), {
            profilePic: url,
            profilePicPath: snap.ref.fullPath,
          });
          setImg("");
        } catch (error) {
          if (error) {
            setErrorMsg("Yükleme Başarısız!");
          }
        }
      };
      uploadImg();
    }
  }, [img]);
  const deleteImage = async () => {
    await deleteObject(ref(storage, user.profilePicPath));

    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      profilePic: "",
      profilePicPath: "",
    });
    navigate("/");
  };
  return user ? (
    <>
      <ProfileNavbar />
      {errorMsg ? (
        <div className="error-div">
          <p className="error-msg">{errorMsg}</p>
        </div>
      ) : null}
      <div className="profile-container">
        <div className="img-container">
          <img src={user.profilePic || Img} alt="profile-image" />
          <div className="overlay">
            <div>
              <label htmlFor="photo">
                <Camera />
              </label>
              <input
                type="file"
                accept="image/*"
                id="photo"
                style={{ display: "none" }}
                onChange={(e) => setImg(e.target.files[0])}
              />
            </div>
            {user.profilePic ? (
              <p
                className="error"
                onClick={deleteImage}
                style={{ cursor: "pointer", fontSize: "16px" }}
              >
                Resmi Kaldır
              </p>
            ) : null}
          </div>
        </div>
        <div className="text-container">
          <h2 className="profile-name">{user.name}</h2>
          <h3 className="profile-email">{user.email}</h3>
          <hr />
          <h4 className="profile-date">
            {user.createdAt.toDate().toDateString()} katıldı.
          </h4>
        </div>
      </div>
    </>
  ) : null;
};

export default Profile;
