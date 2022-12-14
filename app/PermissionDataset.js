const express =require("express")

const permissions ={
    Admin:{
        creation:['Admin','Agent','Merchant','Personal'],
        transactionx:["Agent Cash In","Admin Cash In",],
        transactions:[
            {
                kind:"Agent Cash In",
                with:["Agent"],
                minus:"Admin",
                plus:"Agent",
                min:10000.00,
                max:100000.00,

            },
            {
               kind:"Admin Cash In",
               with:["Self","Admin"],
               minus:"Admin",
                plus:"Admin",
                min:100000.00,
                max:1000000.00,
            }
        ]
    },
    Agent:{
        creation:['Personal'],
        transactionx:["Cash In","Mobile Recharge"],
        transactions:[
            {
                kind:"Cash In",
                with:["Personal"],
                minus:"Agent",
                plus:"Personal",
                min:100.00,
                max:25000.00,

            },
            {
               kind:"Mobile Recharge",
               with:["Self"],
               minus:"Agent",
                plus:"Admin",
                min:100.00,
                max:999.00,
            }
        ]
    },
    Merchant:{
        creation:[],
        transactionx:["Cash Out","Payment", "Mobile Recharge"],
        transactions:[
            {
                kind:"Cash Out",
                with:["Agent"],
                minus:"Merchant",
                plus:"Agent",
                min:100.00,
                max:50000.00,

            },
            {
               kind:"Mobile Recharge",
               with:["Self"],
               minus:"Merchant",
                plus:"Admin",
                min:100.00,
                max:999.00,
            },
            {
               kind:"Payment",
               with:["Merchant"],
               minus:"Merchant",
                plus:"Merchant",
                min:100.00,
                max:100000.00,
            }
        ]
        
    },
    Personal:{
        creation:[],
        transactionx:["Cash Out","Payment", "Mobile Recharge"],
        transactions:[
            {
                kind:"Cash Out",
                with:["Agent"],
                minus:"Personal",
                plus:"Agent",
                min:100.00,
                max:50000.00,

            },
            {
               kind:"Mobile Recharge",
               with:["Self"],
               minus:"Personal",
                plus:"Admin",
                min:100.00,
                max:999.00,
            },
            {
               kind:"Payment",
               with:["Merchant"],
               minus:"Personal",
                plus:"Merchant",
                min:100.00,
                max:100000.00,
            }
        ]
    }
}
module.exports =permissions