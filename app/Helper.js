
const CalculationHelper =require("./CalculationHelper")
module.exports ={
    verifyTransactionPermission: function (currentUser, permissionDataset, transactionKind){
        const thisUserTransactions = permissionDataset[currentUser.kind].transactions;
        const permission = thisUserTransactions.filter(object => object.kind === transactionKind);
        if(permission.length === 1){
            return permission[0];
        }
        return false;
    },

    cookTransaction: async function(from,to,amount,transactionKind,transactionSettings,thisUser) {

        console.log(from);
        console.log(to);
        console.log(amount);
        console.log(transactionKind);
        console.log(transactionSettings);
        console.log(thisUser);


        const transactions =[]
       
        //validate with
        if(transactionSettings.with[0] !== to.kind){
            if(transactionKind !== "Mobile Recharge"){
                return {
                    success: false,
                    code: 401,
                    msg: `${transactionKind} is not possible with this account reason is - to account kind is ${to.kind}.`
                }
            }
        }

        //validate with max min
        if(amount<transactionSettings.min && amount > transactionSettings.max ){
            return {
                success: false,
                code: 401,
                msg: `Amount is not valid`
            }
        }

        //check charge
        let charge =0
        if(transactionSettings.hasOwnProperty('charge')){
            charge = CalculationHelper.calculateCharge(transactionSettings.charge,amount)

        }


    }
             

}