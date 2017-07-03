import React from 'react';

class ExpensesComponent extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        const actions =  (this.props.userData.login) ? 
                    <div> <button>NEW</button><button>PRINT</button></div> :
                    <div>You have to log in to interact</div>;
        return <div  className='expenses'>
            <div> Expenses </div>
            {actions}
        </div>
    }
}
export default ExpensesComponent;
