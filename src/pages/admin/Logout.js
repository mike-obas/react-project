import { useHistory } from 'react-router-dom';
import firebase from 'firebase/app'
import 'firebase/auth'

        function Logout() {
            let history = useHistory();
            firebase.auth().signOut().then(() => {
                return history.push("/resume")
              }).catch((error) => {
                // An error happened.
              }); 
              return null;
        }
        
        export default Logout
        