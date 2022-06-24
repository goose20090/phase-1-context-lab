/* Your Code Here */

function createEmployeeRecord(array){
    let employeeRecordObj = {}

    employeeRecordObj.firstName = array[0];
    employeeRecordObj.familyName = array[1];
    employeeRecordObj.title = array[2];
    employeeRecordObj.payPerHour = array[3];
    employeeRecordObj.timeInEvents = [];
    employeeRecordObj.timeOutEvents = [];

return employeeRecordObj
}

function createEmployeeRecords(arrayofArrays){
    return arrayofArrays.map(employee=> createEmployeeRecord(employee))

}

function createTimeInEvent(dateStamp){
    let timeInEvent = {}
    timeInEvent.type = "TimeIn"
    timeInEvent.date = dateStamp.substring(0,10)
    timeInEvent.hour = parseInt(dateStamp.substring(11, 15))

    this.timeInEvents.push(timeInEvent)

    return this
}

function createTimeOutEvent(dateStamp){
    let timeOutEvent = {}
    timeOutEvent.type = "TimeOut"
    timeOutEvent.date = dateStamp.substring(0,10)
    timeOutEvent.hour = parseInt(dateStamp.substring(11, 15))

    this.timeOutEvents.push(timeOutEvent)
    return this
}


function hoursWorkedOnDate(dateStamp){
    let targetTimeInEvent = this.timeInEvents.find(inEvent=>inEvent.date === dateStamp)
    let targetTimeOutEvent = this.timeOutEvents.find(outEvent => outEvent.date === dateStamp)
    let hoursWorked = (targetTimeOutEvent.hour - targetTimeInEvent.hour)/100
    return hoursWorked
}


function wagesEarnedOnDate(dateStamp){
    let payOwed = hoursWorkedOnDate.call(this, dateStamp) * this.payPerHour
    return payOwed
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName){

    return srcArray.find(emplyeeRecord => emplyeeRecord.firstName ===firstName)
}

function calculatePayroll(arrayOfRecordObj){
    let totalPayroll = 0
    for (let i = 0; i< arrayOfRecordObj.length; i++){
        let aggregateWages = allWagesFor.call(arrayOfRecordObj[i]);
        totalPayroll+= aggregateWages
    }
    return totalPayroll
}