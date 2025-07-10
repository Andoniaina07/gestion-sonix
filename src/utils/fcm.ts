import { useEffect } from "react";
import { getToken } from "firebase/messaging";
import { messaging } from "../config/firebase"
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { saveFcmTokenAction } from "../core/actions/userActions";

const FcmHandler = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const getAndSaveToken = async () => {
      try {
        const token = await getToken(messaging, {
          vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
        });

        if (token) {
          console.log("✅ Token FCM :", token);
          dispatch(saveFcmTokenAction({ token }));
        } else {
          console.warn("❌ Aucun token obtenu. Permission refusée ?");
        }
      } catch (error) {
        console.error("❌ Erreur FCM token :", error);
      }
    };

    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        getAndSaveToken();
      } else {
        console.warn("🔒 Permission notifications refusée");
      }
    });
  }, [dispatch]);

  return null;
};

export default FcmHandler;
