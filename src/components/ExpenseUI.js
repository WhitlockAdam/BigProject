import React, { useState } from 'react';

function ExpenseUI(){
    
    var expenseName = "";
    
    var expenseCost = "";

    var search = "";

    const [message, setMessage] = useState("");

    const [searchResults, setResults] = useState("");

    const [expenseList, setExpenseList] = useState("");

    const addExpense = async event =>{

        event.preventDefault();

        alert("add");

    }

    const searchExpense = async event =>{
        
        event.preventDefault();
        
        alert("search");
    
    }

    return(
        <div id="budgetUIDiv">
            <br/>
            <input type="text" id="searchText" placeholder="Expense To Search For" ref={(c) => search = c}></input>
            <button type="button" id="searchExpenseButton" class="buttons" onClick={searchExpense}>Search</button>
            <br/>
            <span id="expenseSearchResult"></span>
            <p id="expenseList"></p>
            <br/>
            <br/>
            <input type="text" id="expenseName" placeholder="Expense To Add" ref={(c) => expenseName = c}></input>
            <input type="number" id="expenseCost" placeholder="Cost" ref={(c) => expenseCost = c}></input>
            <button type="button" id="addExpenseButton" class="buttons" onClick={addExpense}>Add</button>
            <br/>
            <span id="expenseAddResult">{message}</span>
        </div>
    );
    
};

export default ExpenseUI;