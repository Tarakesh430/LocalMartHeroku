import bcrypt from 'bcryptjs';

const data={
    users:[
        {
            name:'Tarakesh',
            email:'tarakeshpolakolu@gmail.com',
            password:bcrypt.hashSync('1234',8),
            isAdmin:true,
        },
        {
            name:'Lowdaa',
            email:'tarakeshpolaki123@gmail.com',
            password:bcrypt.hashSync('1234',8),
            isAdmin:false,
        },
    ]
    ,
    products:[
        {
            
            name:'Nike Slim Shirt',
            category:"Shirts",
            image:'/images/p1.jpg',
            price:120,
            brand:'Nike',
            rating:4.5,
            numReviews:10,
            countInStock:4,
            description:'high quality product'
        },
        {
           
            name:'Adidas Slim Shirt',
            category:"Shirts",
            image:'/images/p1.jpg',
            price:20,
            brand:'Lowda',
            rating:4,
            numReviews:10,
            countInStock:3,
            description:'lowdaa quality product'
        },
    ],
}
export default data;