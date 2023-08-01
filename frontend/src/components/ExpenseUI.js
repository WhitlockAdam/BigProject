import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './css/styles.css';

function ExpenseUI(){

    var bp = require('./Path.js');

    var expenseName = "";
    
    var expenseCost = "";

    var expenseMonth = "";

    var expenseDay = "";
    
    var expenseYear = "";

    var searchName = "";

    var searchCost = "";

    var searchMonth = "";

    var searchDay = "";

    var searchYear = "";

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

        let obj = {userId:_id, name: expenseName.value, cost: expenseCost.value, day: expenseDay.value, month: expenseMonth.value, year: expenseYear.value, jwtToken: storage.retrieveToken()};

        let jsonObj = JSON.stringify(obj);

        var config =
        {
            method: 'post',
            url: bp.buildPath('api/addexpense'),
            headers:
            {
                'Content-Type': 'application/json'
            },
            data: jsonObj
        };

        axios(config).then(async function (response){

            let res = response.data;

            if(res.error){
                setMessage("API Error:" + res.error);
            }
            else{
                setMessage("Expense Added");
                storage.storeToken( res.jwtToken );
            }

        })
        .catch(function(e){
            setMessage(e.toString());
        });

    }

    const searchExpense = async event =>{
        
        event.preventDefault();

        var storage = require('../tokenStorage.js');
        
        let obj = {userId: _id, queryName: searchName.value, queryCost: searchCost.value, queryMonth: searchMonth.value, queryDay: searchDay.value, queryYear: searchYear.value, jwtToken: storage.retrieveToken()};
    
        let jsonObj = JSON.stringify(obj);

        var config =
        {
            method: 'post',
            url: bp.buildPath('api/searchexpense'),
            headers:
            {
                'Content-Type': 'application/json'
            },
            data: jsonObj
        };

        axios(config).then(function (response){
            let res = response.data;
            let _results = res.results;
            let resultList = [];
            for(var i = 0; i < _results.length; i++){
                resultList.push({name: _results[i].name, cost: _results[i].cost, date: `${_results[i].month.toString()}/${_results[i].day.toString()}/${_results[i].year.toString()}`, _id: _results[i]._id, selected: false});
            }
            setResults("Search Complete.");
            storage.storeToken( res.jwtToken );
            setExpenseList(resultList);
        })
        .catch(function(e){
            alert(e.toString());
            setResults(e.toString());
        });

    };

    const deleteExpense = async event => {

        event.preventDefault();

        deleteList.forEach(async element => {

            let obj = {userId: _id, query: element};
    
            let jsonObj = JSON.stringify(obj);

            var config =
            {
                method: 'post',
                url: bp.buildPath('api/deleteexpense'),
                headers:
                {
                    'Content-Type': 'application/json'
                },
                data: jsonObj
            };

            axios(config).then(function (response){

                var res = response.data;

                if(res.error){

                    setMessage(res.error);
                
                }

                setDeleteList([]);

            })
            .catch(function(e){
                alert(e.toString());
                setResults(e.toString());
            });

        });

    }

    return(
        <div id="budgetUIDiv">
            <br/>
            <input type="text" id="searchName" placeholder="Name" ref={(c) => searchName = c}></input>
            <input type="text" id="searchCost" placeholder="Cost" ref={(c) => searchCost = c}></input>
            <input type="text" id="searchMonth" ref={(c) => searchMonth = c}></input>
            <input type="text" id="searchDay" ref={(c) => searchDay = c}></input>
            <input type="text" id="searchYear" ref={(c) => searchYear = c}></input>
            <Button className='custom-btn' type="button" id="searchExpenseButton" onClick={searchExpense}>Search</Button>
            <br/>
            <span id="expenseSearchResult">{searchResults}</span>
            <div className='form-wrapper'>
                <Table id="expenseList" className='table'>
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
                                <td><ToggleButton className='custom-btn delete-btn' type="checkbox" variant="outline-primary" checked={r.bool} onClick={() => {deleteList.indexOf(r._id)===-1 ? setDeleteList((prev)=>[...prev, r._id]) : deleteList.splice(deleteList.indexOf(r._id), 1); setExpenseList(expenseList.map((element)=>element._id===r._id?{...element, bool: !element.bool} : {...element}));}}>Delete</ToggleButton></td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
            <br/>
            <br/>
            <input type="text" id="expenseName" placeholder="Name" ref={(c) => expenseName = c}></input>
            <input type="number" id="expenseCost" placeholder="Cost" ref={(c) => expenseCost = c}></input>
            <input type="text" id="expenseMonth" ref={(c) => expenseMonth = c}></input>
            <input type="text" id="expenseDay" ref={(c) => expenseDay = c}></input>
            <input type="text" id="expenseYear" ref={(c) => expenseYear = c}></input>
            <Button className='custom-btn' type="button" id="addExpenseButton" onClick={addExpense}>Add</Button>
            <br/>
            <span id="expenseAddResult">{message}</span>
            <br/>
            <Button className="custom-btn" onClick={deleteExpense}>Delete</Button>
        </div>
    );
    
};

export default ExpenseUI;