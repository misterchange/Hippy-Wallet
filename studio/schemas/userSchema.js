export const userSchema = {
    name: 'user',
    title:'Users',
    type:'document',
    fields:[
        {
            name:'address',
            title:'Wallet Address',
            type:'string',
        },
        {
            name:'username',
            title:'User Name',
            type:'string', 
        },
        {
            name:'transactions',
            title:'Transactions',
            type:'array',
            of:[
                {
                    type:'reference',
                    to:[{type:'transactions'}],
                },
            ], 
        },
    ],
}