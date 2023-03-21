require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const authMiddleware = require('./middlewares/authMiddlewares')
const flasherMiddleware = require('./middlewares/flasherMiddleware')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.locals.message = {}
app.locals.formData = {}
app.locals.errors = {}


// app.use('/', authRoutes)
// // app.get('/', flasherMiddleware, (req, res) => {
// //   // console.log(req.method)
// //   return res.render('index')
// // })
// app.get('/', authMiddleware, (req, res) => {
//   return res.render('home', { title: 'Homepage'})
// })
// app.get('/pageSingle', (req, res) => {
//   return res.render('singlepage', { title: 'Product Page' })
// })
// app.get('/featuredproducts', (req, res) => {
//   return res.render('featuredproducts', { title: 'Featured Products' })
// })
// app.get('/categories', (req, res) => {
//   return res.render('pagecategory', { title: 'Categories' })
// })
// app.get('/wishlist', authMiddleware, (req, res) => {
//   return res.render('wishlist', { title: 'Wishlist' })
// })
// app.use((req, res, next) => {
//   res.status(404).render("404", {title: '404'})
// })
// app.listen(config.port, () => {
//   console.log(`Server running at port ${config.port}`)
// })
// module.exports = app

const sqlite3 = require('sqlite3').verbose();

// Open SQLite database
const db = new sqlite3.Database('database.db');
//create table
create_table_products = `CREATE TABLE if not exists products(
  productcode varchar(255) NOT NULL unique,
  productname varchar(100) not null,
  description varchar(5000) not null,
  features varchar(2000) not null,
  imageURL varchar(1000) not null,
  imagethumbnail1 varchar(1000) not null,
  imagethumbnail2 varchar(1000) not null,
  imagethumbnail3 varchar(1000) not null,
  rating float not null,
  reviewed integer not null,
  favourite boolean not null,
  brand varchar(255) not null,
  category varchar(255) not null,
  mrp float not null,
  currentprice float not null,
  stock integer not null,
  sold integer not null,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

// db.run(create_table_products, (err) => {
//   if (err) throw err;
//   console.log('table products created successfully');
// });

create_table_user = `create table if not exists user(
  uid int not null primary key,
  username varchar(255) not null,
  email varchar(255) not null,
  password varchar(255) not null,
  isLoggedIn boolean,
  liked varchar(1000),
  wishlist varchar(1000),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;
// db.run(create_table_user, (err) => {
//   if (err) throw err;
//   console.log('table user created successfully');
// });


// db.run(`INSERT INTO products (productcode,productname,description,features,imageURL,imagethumbnail1,imagethumbnail2,imagethumbnail3,rating,reviewed,favourite,brand,category,mrp,currentprice,stock,sold) 
// VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, 
//   ['ma10', 'Apple iPhone 14 Pro Max (256GB, Deep Purple)',
// 'Display: 6.7 inches (17.00 cm) OLED Display Memory: 256GB ROM Processor: A16 Bionic Chip, Hexa Core Camera: 48 MP + 12 MP + 12 MP Triple Rear & 12 MP Front Camera Battery: Qi Wireless Charging Up to 7.5W Security (Lock): Facial Lock',
// 'Display: 6.7 inches (17.00 cm) OLED',  
// "images/apple/ma10.webp","images/apple/ma11.webp","images/apple/ma12.webp","images/apple/ma13.webp",
//   5, 308, false, 'iPhone', 'Mobiles', 149900.00, 137990.00, 150, 73],
//   (err) => {
//   if (err) throw err;
//   console.log('Data inserted successfully');
// });

// db.run(`INSERT INTO products (productcode,productname,description,features,imageURL,imagethumbnail1,imagethumbnail2,imagethumbnail3,rating,reviewed,favourite,brand,category,mrp,currentprice,stock,sold) 
// VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, 
// ['hp10',
//  'PowerMax Exercise Spin Bike (Heart Rate Sensor, MB-165, Blue)',
//  '15.54 cm (6.1-inch) Super Retina XDR display featuring Always-On and ProMotion. Dynamic Island, a magical new way to interact with iPhone. 48MP Main camera for up to 4x greater resolution. Cinematic mode now in 4K Dolby Vision up to 30 fps. Action mode for smooth, steady, handheld videos',
// 'Display: 6.7 inches (17.00 cm) OLED',
// "images/powermax/hp10.webp",
// "images/powermax/hp11.webp",
// "images/powermax/hp12.webp",
// "images/powermax/hp13.webp",
//  4.2, 113, false, 'PowerMax', 'Health',
//  42000.00, 24990.00, 1102, 291],
//   (err) => {
//   if (err) throw err;
//   console.log('Data inserted successfully');
// });


// db.run(`INSERT INTO products (productcode,productname,description,features,imageURL,imagethumbnail1,imagethumbnail2,imagethumbnail3,rating,reviewed,favourite,brand,category,mrp,currentprice,stock,sold) 
// VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, 
// ['las10',
//  'ASUS ROG Zephyrus G14 AMD Ryzen 7',
//  '16 inch, 32GB, 2TB, Windows 11 Home, MS Office Home and Student, NVIDIA GeForce RTX 3060 Laptop GPU, FHD+ IPS Display, Black, GX650RM-LS019WS',
// 'AMD Ryzen 7 6800H processor',
// "images/asus/las10.avif",
// "images/asus/las11.avif",
// "images/asus/las12.avif",
// "images/asus/las13.avif",
//  4.5, 250, false, 'ROG Zephyrus', 'Laptops',
//  298990, 224990, 250, 112],
//   (err) => {
//   if (err) throw err;
//   console.log('Data inserted successfully');
// });


// update table 

// drop table 
// drop = `drop table user`;
// db.run(drop, (err) => {
//   if (err) throw err;
//   console.log('Table deleted successfully');
// });

// alter table
// alter = `alter table products add unique index(productcode)`
// db.run(alter, (err) => {
//     if (err) throw err;
//   console.log('Table updated successfully');
// })

// query the data
sql = `SELECT * FROM products`;
db.all(sql, [], (err, rows) => {
    if(err) return console.log(err.message);
    rows.forEach(row => console.log(row));
});


app.get('/', (req, res) => {
  db.all('SELECT * FROM products', (err, rows) => {
    if (err) throw err;
    res.render('home', { data: rows , title: 'Homepage' });
  });
});

app.get('/homepage', (req, res) => {
  return res.redirect('/')
})

app.get("/register",(req,res)=>{
  res.render("login",{ title: 'Register | Login'});
});

app.get("/category",(req,res)=>{
  res.render("pagecategory",{ title: 'Category'});
});

app.get("/login",(req,res)=>{
  res.render("login",{ title: 'Login | Register'});
});

app.post('/login', (req, res) => {
  var uname = req.body.username;
  var upass = req.body.upassword;
  var isLoggedIn;
  db.all("select * from user",(err, users) => {
    users.forEach((user) => {
    if ((user.username === uname) && (user.password === upass)){
      user.isLoggedIn = true;
      console.log(user)
      res.redirect("/homepage");
    }
  
  });
  })
});

app.get("/cart",(req,res)=>{
  res.render("login",{ title: 'Cart'});
});
app.get("/checkout",(req,res)=>{
  res.render("login",{ title: 'Checkout'});
});

// app.get('/isAuthenticated', (req, res) => {
  
// })

var u = 1;
app.post("/register",(req,res)=>{
  const sql="Insert into user(uid, username,email,password, isLoggedIn) values(?,?,?,?,?);";
  const User=[u++,req.body.name,req.body.email,req.body.password, false];
  db.run(sql,User,err=>{
    if(err){
      console.log(err.message);
    }
    res.redirect("/homepage");
  })
});

logindb = `SELECT * FROM user`;
db.all(logindb, [], (err, rows) => {
    if(err) return console.log(err.message);
    rows.forEach(row => console.log(row));
});



app.get('/pageoffer', (req, res) => {
    res.render('pageoffer', {title: 'Pageoffer' });
});

app.get('/featuredproducts', (req, res) => {
  // sort by rating
  db.all('SELECT * FROM products order by rating DESC', (err, featuredproducts) => {
  if (err) throw err;
  res.render('products', { data: featuredproducts , title: 'Featured Products' });
});
})

app.get('/trendingproducts', (req, res) => {
  // sort by rating
  db.all('SELECT * FROM products order by sold DESC', (err, trendingproducts) => {
  if (err) throw err;
  res.render('products', { data: trendingproducts , title: 'Trending Products' });
});
})


// app.get('/search', (req, res) => {
//   var text = req.body.search;
//   db.all("SELECT * FROM products where productname LIKE '%"+text+"%'", (err, searchproducts) => {
//   if (err) throw err;
//   res.render('products', { data: searchproducts , title: 'Search Results' });
// });
// })

app.get('/pagecategory', (req, res) => {
  res.render('pagecategory', { title: 'Category Page' });
})

// app.get('/:category', (req, res) => {
//   var pid =req.params.category;
//   db.all("select * from products",(err, products) => {
//     products.forEach((product) => {
//     if (product.category === pid){
//       res.render('pagecategory', { data: product , title: 'Category' });
//     }});
//   })
// });



app.get('/:id', (req, res) => {
  var pid =req.params.id;
  var Title;
  db.all("select * from products",(err, products) => {
    products.forEach((product) => {
      Title = product.title
    if (product.productcode === pid){
      res.render('singlepage', { data: product , title: Title });
    }});
  })
});



app.use((req, res, next) => {
  res.status(404).render("404", {title: '404'})
})

app.listen(parseInt(process.env.PORT) || 3000, () => {
  console.log(`Server running at port ${parseInt(process.env.PORT) || 3000}`)
})


