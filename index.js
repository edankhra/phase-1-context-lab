/* Your Code Here */
function createEmployeeRecord(employeeData) {
    return {
      firstName: employeeData[0],
      familyName: employeeData[1],
      title: employeeData[2],
      payPerHour: employeeData[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
  }
  
  // Employee Records
  function createEmployeeRecords(employeesData) {
    return employeesData.map(createEmployeeRecord);
  }
  
  // Time In Event
  function createTimeInEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(" ");
    const timeInEvent = {
      type: "TimeIn",
      date: date,
      hour: parseInt(hour),
    };
    employeeRecord.timeInEvents.push(timeInEvent);
    return employeeRecord;
  }
  
  // Time Out Event
  function createTimeOutEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(" ");
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date: date,
    });
    return employeeRecord;
  }
  
  // Hours Worked on Date
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(
      (event) => event.date === date
    );
    const timeOutEvent = employeeRecord.timeOutEvents.find(
      (event) => event.date === date
    );
  
    return (timeOutEvent.hour - timeInEvent.hour) / 100;
  }
  
  // Wages Earned on Date
  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour;
  }
  
  // All Wages For
  function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map((event) => event.date);
    const totalWages = datesWorked.reduce(
      (total, date) => total + wagesEarnedOnDate(employeeRecord, date),
      0
    );
    return totalWages;
  }
  
  // Find Employee By First Name
  function findEmployeeByFirstName(collection, firstName) {
    return collection.find((employee) => employee.firstName === firstName);
  }
  
  // Calculate Payroll
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce(
      (totalPayroll, employeeRecord) => totalPayroll + allWagesFor(employeeRecord),
      0
    );
  }
  
  // Example usage
  const employeesData = [
    ["Loki", "Laufeyson", "Manager", 35],
    ["Natalia", "Romanova", "Supervisor", 45],
  ];
  
  const employees = createEmployeeRecords(employeesData);
  
  createTimeInEvent(employees[0], "2023-06-12 08:00");
  createTimeOutEvent(employees[0], "2023-06-12 10:00");
  createTimeInEvent(employees[1], "2023-06-12 09:00");
  createTimeOutEvent(employees[1], "2023-06-12 14:00");
  
  console.log(hoursWorkedOnDate(employees[0], "2023-06-12")); // Output: 2
  console.log(wagesEarnedOnDate(employees[0], "2023-06-12")); // Output: 70
  console.log(allWagesFor(employees[0])); // Output: 70
  console.log(allWagesFor(employees[1])); // Output: 225
  console.log(calculatePayroll(employees)); // Output: 295