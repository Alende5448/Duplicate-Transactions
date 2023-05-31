

function findDuplicateTransactions (transactions) {

  // Check transaction empty or not
  if(transactions === null || transactions === ""){
    throw new Error ('Invalid transaction');
  }
  //  Copy transaction
  let copyTransaction= [...transactions];

  // Sort transaction
  copyTransaction.sort((a, b) => new Date(a.time) - new Date(b.time));

const result = [];

 // Check time in minutes
const timeCheck = (time1, time2) => {
  return (new Date(time1) - new Date(time2))/60000;
}

 while(copyTransaction.length){
    const member = [];
    // Shift individual objects into reference
    let reference = copyTransaction.shift()
    member.push(reference);

      // Check conditions
    for(let i = 0; i < copyTransaction.length; i++) {
      if(reference.sourceAccount === copyTransaction[i].sourceAccount &&
         reference.targetAccount === copyTransaction[i].targetAccount &&
         reference.amount === copyTransaction[i].amount &&
         reference.category === copyTransaction[i].category && timeCheck(copyTransaction[i].time, reference.time) <= 1){
          // Push objects to form groups
          member.push(copyTransaction[i]);
          // change value of reference
          reference = copyTransaction[i];
          // Remove object from copyTransaction
          copyTransaction.splice(i, 1);
          // Resets value of i in for loop
          i -= 1;
        }
    }
    // push groups to result
    if(member.length > 1){
    result.push(member);
    }
  }
 return result;
}

export default findDuplicateTransactions;