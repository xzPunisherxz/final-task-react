import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import Main from "../../pages/main/main";
import Login from "../../pages/login/login";
import Users from "../../pages/users/users";
import { AppRoute } from "../../const";
import EditAdd from "../../pages/edit-add/edit-add";
import { observer } from "mobx-react-lite";
import { tasks, users} from "../../store/index";
import "../../scss/App.scss";



const App = observer (() => {
  useEffect(() => {
    tasks.fetch();
    users.fetch()
}, []);
  
if ((tasks.data.length === 0) && (users.data.length === 0)) {
  return (
      <>
          <section className="main__header">
              <img src="../images/Logo.png" alt="логотип" />
              <section className="main__header-wrap">
                  <div className="main__header-group-link">
                      <div className="main__user-profile  dropdown">
                          <div className="main__user-img-wrapper  ">
                          </div>
                      </div>
                  </div>
              </section>
          </section>
          
      </>
  )

} else {
    return (
        <BrowserRouter>
        <Switch>
        <Route path="/" exact>
            <Redirect to={AppRoute.LOGIN} />
          </Route>
            <Route exact path={AppRoute.LOGIN} component={Login}/>             
            
            <Route path={AppRoute.TASK} exact>
              <Main tasks={tasks.data} users={users.data} />
            </Route>
            
            <Route path={AppRoute.USER} exact>
              <Users tasks={tasks.data} users={users.data}/>
            </Route>
            <Route path={AppRoute.EDIT} exact>
              <EditAdd tasks={tasks.data} users={users.data}/>
            </Route>
            <Route path={AppRoute.ADD_TASK_TO_USER} exact>
              <EditAdd tasks={tasks.data} users={users.data}/>
            </Route>
        </Switch>
        </BrowserRouter>
    );
  }
}
)

export default App;