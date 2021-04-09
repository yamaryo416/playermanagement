import React, { VFC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Top } from '../components/pages/Top';
import { Main } from '../components/pages/Main';

export const Router: VFC = () => {
    console.log("router")
    return (
        <Switch>
            <Route exact path="/" component={Top} />
            <Route exact path="/main" component={Main} />
        </Switch>
    )
}

