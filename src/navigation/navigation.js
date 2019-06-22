
import { createStackNavigator, createAppContainer } from "react-navigation";
import Login from "../components/stdLogin/index";
import TeacherInfo from "../components/teacherInfo/index";
import TeacherEnteries from "../components/teacherEnteries/index";
import TchLogin from "../components/tchLogin/tchLogin";
const AppNavigator = createStackNavigator(
    {
        Home: Login,
        TeacherInfo:TeacherInfo,
        TeacherEnteries:TeacherEnteries,
        TchLogin:TchLogin
    },
    {
    headerMode:"none"
    }

);

export default createAppContainer(AppNavigator);