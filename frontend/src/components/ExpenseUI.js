import React, { useState } from 'react';

function ExpenseUI(){
    
    const app_name = "budget-manager-group14";
    function buildPath(route)
    {

        if(process.env.NODE_ENV === "production")
        {
            return("https://" + app_name + ".herokuapp.com/" + route);
        }
        else
        {
            return "http://localhost:5000/" + route;
        }

    }

    var expenseName = "";
    
    var expenseCost = "";

    var search = "";

    const [message, setMessage] = useState("");

    const [searchResults, setResults] = useState("");

    const [expenseList, setExpenseList] = useState("");

    let _userdata = localStorage.getItem("user_data");

    let userdata = JSON.parse(_userdata);

    let userId = userdata.id;

    let firstName = userdata.firstName;

    let lastName = userdata.lastName;

    const addExpense = async event =>{

        event.preventDefault();

        let obj = {userId:userId, expense:[expenseName.value, expenseCost.value]};

        let jsonObj = JSON.stringify(obj);

        try{

            const response = await fetch(
                buildPath("api/addexpense"),
                {method:"POST", body:jsonObj, headers:{"Content-Type":"application/json"}}
            );

            let text = await response.text();
            let res = JSON.parse(text);

            if(res.error.length > 0){
                setMessage("API Error:" + res.error);
            }
            else{
                setMessage("Expense Added");
            }

        }
        catch(e){
            setMessage(e.toString());
        }

    }

    const searchExpense = async event =>{
        
        event.preventDefault();
        
        let obj = {userId: userId, query: search.value};
    
        let jsonObj = JSON.stringify(obj);

        try{
            const response = await fetch(
                buildPath("api/searchexpense"),
                {method:"POST", body:jsonObj, headers:{"Content-Type":"application/json"}}
            );

            let text = await response.text();
            let res = JSON.parse(text);
            let _results = res.results;
            let resultText = "";
            for(var i = 0; i < _results.length; i++){
                resultText += _results[i];
                if(i < _results.length - 1){
                    resultText += ", ";
                }
            }
            setResults("Search Complete.")
            setExpenseList(resultText);
        }
        catch(e){
            alert(e.toString());
            setResults(e.toString());
        }

    };

    return(
        <div id="budgetUIDiv">
            <br/>
            <input type="text" id="searchText" placeholder="Expense To Search For" ref={(c) => search = c}></input>
            <button type="button" id="searchExpenseButton" class="buttons" onClick={searchExpense}>Search</button>
            <br/>
            <span id="expenseSearchResult">{searchResults}</span>
            <p id="expenseList">{expenseList}</p>
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