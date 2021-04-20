import React, { VFC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Top } from '../components/pages/Top';
import { Main } from '../components/pages/Main';
import { Team } from '../components/pages/Team';
import { TeamDetail } from '../components/pages/TeamDetail';

export const Router: VFC = () => {
    console.log("router")
    return (
        <Switch>
            <Route exact path="/" component={Top} />
            <Route 
                path="/team" 
                render={()=> (
                    <Switch>
                        <Route
                            exact
                            path="/team/"
                            component={Team}
                        />
                        <Route
                            path="/team/:id"
                            component={TeamDetail}
                        />
                    </Switch>
                )}
            />
            <Route exact path="/main" component={Main} />
        </Switch>
    )
}

