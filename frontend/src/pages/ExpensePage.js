import React from 'react';
import ExpenseUI from '../components/ExpenseUI';
import NavigationBar from '../components/NavigationBar';

const ExpensePage = () =>{

    return(
        <div>
            <NavigationBar/>
            <ExpenseUI/>
        </div>
    );

};

export default ExpensePage;