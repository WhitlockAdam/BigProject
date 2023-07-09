import React from 'react';
import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';
import ExpenseUI from '../components/ExpenseUI';

const ExpensePage = () =>{

    return(
        <div>
            <PageTitle/>
            <LoggedInName/>
            <ExpenseUI/>
        </div>
    );

};

export default ExpensePage;