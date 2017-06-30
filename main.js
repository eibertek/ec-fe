import React from 'react';
import ReactDOM from 'react-dom';
import ExpensesComponent from './components/expenses';
import UserComponent from './components/users';

class RootComponent extends React.Component {
    render(){
        return <div>
            <UserComponent />
            <ExpensesComponent></ExpensesComponent>
        </div>;
    }
}

export const setReactDom = (containerId) => {
       ReactDOM.render(<RootComponent />, document.getElementById(containerId));
}

setReactDom('hello');
