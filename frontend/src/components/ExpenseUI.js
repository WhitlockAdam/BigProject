import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Button from 'react-bootstrap/Button';
import { useJwt } from 'react-jwt';

function ExpenseUI(){

    var bp = require('./Path.js');
    
    /*
    const app_name = "budget-manager-group14-bacfc735e9a2";
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
    */

    var expenseName = "";
    
    var expenseCost = "";

    var expenseDate = "";

    var searchName = "";

    var searchCost = "";

    var searchDate = "";

    const [deleteList, setDeleteList] = useState([]);

    const [message, setMessage] = useState(""); 

    const [searchResults, setResults] = useState("");

    const [expenseList, setExpenseList] = useState([]);

    let _userdata = localStorage.getItem("user_data");

    let userdata = JSON.parse(_userdata);

    let _id = userdata._id;

    const addExpense = async event =>{

        event.preventDefault();

        var storage = require('../tokenStorage.js');

        let obj = {userId:_id, name: expenseName.value, cost: expenseCost.value, date: expenseDate.value, jwtToken: storage.retrieveToken()};

        let jsonObj = JSON.stringify(obj);

        try{

            const response = await fetch(
                bp.buildPath("api/addexpense"),
                {method:"POST", body:jsonObj, headers:{"Content-Type":"application/json"}}
            );

            let text = await response.text();
            let res = JSON.parse(text);

            if(res.error.length > 0){
                setMessage("API Error:" + res.error);
            }
            else{
                setMessage("Expense Added");
                storage.storeToken( res.jwtToken );
            }

        }
        catch(e){
            setMessage(e.toString());
        }

    }

    const searchExpense = async event =>{
        
        event.preventDefault();

        var storage = require('../tokenStorage.js');
        
        let obj = {userId: _id, queryName: searchName.value, queryCost: searchCost.value, queryDate: searchDate.value, jwtToken: storage.retrieveToken()};
    
        let jsonObj = JSON.stringify(obj);

        try{
            const response = await fetch(
                bp.buildPath("api/searchexpense"),
                {method:"POST", body:jsonObj, headers:{"Content-Type":"application/json"}}
            );

            let text = await response.text();
            let res = JSON.parse(text);
            let _results = res.results;
            let resultList = [];
            for(var i = 0; i < _results.length; i++){
                resultList.push({name: _results[i].name, cost: _results[i].cost, date: _results[i].date, _id: _results[i]._id, selected: false});
            }
            setResults("Search Complete.");
            storage.storeToken( res.jwtToken );
            setExpenseList(resultList);
        }
        catch(e){
            alert(e.toString());
            setResults(e.toString());
        }

    };

    const deleteExpense = async event => {

        event.preventDefault();

        deleteList.forEach(async element => {

            let obj = {userId: _id, query: element};
    
            let jsonObj = JSON.stringify(obj);

            try{
                const response = await fetch(
                    bp.buildPath("api/deleteexpense"),
                    {method:"POST", body:jsonObj, headers:{"Content-Type":"application/json"}}
                );

                let text = await response.text();

                setDeleteList([]);

            }
            catch(e){
                alert(e.toString());
                setResults(e.toString());
            }

        });

    }

    return(
        <div id="budgetUIDiv">
            <br/>
            <input type="text" id="searchName" placeholder="Name" ref={(c) => searchName = c}></input>
            <input type="text" id="searchCost" placeholder="Cost" ref={(c) => searchCost = c}></input>
            <input type="date" id="searchDate" ref={(c) => searchDate = c}></input>
            <button type="button" id="searchExpenseButton" class="buttons" onClick={searchExpense}>Search</button>
            <br/>
            <span id="expenseSearchResult">{searchResults}</span>
            <Table id="expenseList">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Cost</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {expenseList.map((r) =>
                        <tr key={r._id}>
                            <td>{r.name}</td>
                            <td>{r.cost}</td>
                            <td>{r.date}</td>
                            <td style={{visibility: 'hidden'}}>{r._id}</td>
                            <td><ToggleButton className='mb-2' type="checkbox" variant="outline-primary" checked={r.bool} onClick={() => {deleteList.indexOf(r._id)===-1 ? setDeleteList((prev)=>[...prev, r._id]) : deleteList.splice(deleteList.indexOf(r._id), 1); setExpenseList(expenseList.map((element)=>element._id===r._id?{...element, bool: !element.bool} : {...element}));}}>Delete</ToggleButton></td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <br/>
            <br/>
            <input type="text" id="expenseName" placeholder="Name" ref={(c) => expenseName = c}></input>
            <input type="number" id="expenseCost" placeholder="Cost" ref={(c) => expenseCost = c}></input>
            <input type="date" id="expenseDate" ref={(c) => expenseDate = c}></input>
            <button type="button" id="addExpenseButton" class="buttons" onClick={addExpense}>Add</button>
            <br/>
            <span id="expenseAddResult">{message}</span>
            <br/>
            <Button onClick={deleteExpense}>Delete</Button>
        </div>
    );
    
};

export default ExpenseUI;