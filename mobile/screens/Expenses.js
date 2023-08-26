import * as React from 'react';
import { TextInput, Button, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useState } from 'react'
import axios from 'axios';


function Expenses({route, navigation})
{

    const [expenseName, setExpenseName] = useState('');
    const [expenseCost, setExpenseCost] = useState('');
    const [expenseDate, setExpenseDate] = useState('');
    const [searchName, setSearchName] = useState('');
    const [searchCost, setSearchCost] = useState('');
    const [searchDay, setSearchDay] = useState('');
    const [searchMonth, setSearchMonth] = useState('');
    const [searchYear, setSearchYear] = useState('');

    const [deleteList, setDeleteList] = useState([]);

    const [message, setMessage] = useState(""); 

    const [searchResults, setResults] = useState("");

    const [expenseList, setExpenseList] = useState([]);

    const { user } = route.params;
    let _id = user._id;

    function expenseNameHandler(enteredExpenseName)
    {
        setExpenseName(enteredExpenseName);
    }
    function expenseCostHandler(enteredExpenseCost)
    {
        setExpenseCost(enteredExpenseCost);
    }
    function expenseDateHandler(enteredExpenseDate)
    {
        setExpenseDate(enteredExpenseDate);
    }
    function searchNameHandler(enteredSearchName)
    {
        setSearchName(enteredSearchName);
    }
    function searchCostHandler(enteredSearchCost)
    {
        setSearchCost(enteredSearchCost);
    }
    function searchDayHandler(enteredSearchDay)
    {
        setSearchDay(enteredSearchDay);
    }
    function searchMonthHandler(enteredSearchMonth)
    {
        setSearchMonth(enteredSearchMonth);
    }
    function searchYearHandler(enteredSearchYear)
    {
        setSearchYear(enteredSearchYear);
    }
    
    const addExpense = async event =>{

        event.preventDefault();
        let obj = {userId:_id, name: expenseName, cost: expenseCost, date: expenseDate};

        let jsonObj = JSON.stringify(obj);

        var config =
        {
            method: 'post',
            url: 'https://budget-manager-group14-bacfc735e9a2.herokuapp.com/api/addexpense',
            headers:
            {
                'Content-Type': 'application/json'
            },
            data: jsonObj
        }

        axios(config).then(async function (response){

            let res = response.data;

            if(res.error){
                setMessage("API Error:" + res.error);
            }
            else{
                setMessage("Expense Added");
            }

        })
        .catch(function(e){
            setMessage(e.toString());
        });
        
    }

    const searchExpense = async event =>{
        


        event.preventDefault();

        let obj = {userId: _id, queryName: searchName, queryCost: searchCost, queryMonth: searchMonth, queryDay: searchDay, queryYear: searchYear};
    
        let jsonObj = JSON.stringify(obj);
    var config =
        {
            method: 'post',
            url: 'https://budget-manager-group14-bacfc735e9a2.herokuapp.com/api/searchexpense',
            headers:
            {
                'Content-Type': 'application/json'
            },
            data: jsonObj
        }
        axios(config).then(function (response){
            let res = response.data;
            let _results = res.results;
            let resultList = [];
            for(var i = 0; i < _results.length; i++){
                resultList.push({name: _results[i].name, cost: _results[i].cost, date: `${_results[i].month.toString()}/${_results[i].day.toString()}/${_results[i].year.toString()}`, _id: _results[i]._id, selected: false});
            }
            setResults("Search Complete.");
            setExpenseList(resultList);
        })
        .catch(function(e){
            alert(e.toString());
            setResults(e.toString());
        });

    }

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
        <View style = {styles.container}>
            <View style = {styles.searchContainer}>
                <TextInput style = {styles.textInput} placeholder = 'Name' onChangeText = {searchNameHandler} value = {searchName}/>
                <TextInput style = {styles.textInput} placeholder = 'Cost' onChangeText = {searchCostHandler} value = {searchCost}/>
                <TextInput style = {styles.textInput} placeholder = 'Day' onChangeText = {searchDayHandler} value = {searchDay}/>
                <TextInput style = {styles.textInput} placeholder = 'Month' onChangeText = {searchMonthHandler} value = {searchMonth}/>
                <TextInput style = {styles.textInput} placeholder = 'Year' onChangeText = {searchYearHandler} value = {searchYear}/>
            </View>
            <Button title = 'search' onPress = {searchExpense}/>
            <FlatList>
            </FlatList>
        </View> 
    );

}

export default Expenses;

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        backgroundColor: '#273A4B', 
    },
    searchContainer: {
        flexDirection: 'row',
    },
    textInput: {
        backgroundColor: '#AA9675', 
        flexDirection: 'row',
        flex: 1,
        borderWidth: 1,
        borderColor: '#cccccc',
        width: '80%',
        height: '100%',
        marginRight: 8,
        padding: 6,
      },
})