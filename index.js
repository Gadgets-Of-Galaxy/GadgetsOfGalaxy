require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
// const authMiddleware = require('./middlewares/authMiddlewares')
// const flasherMiddleware = require('./middlewares/flasherMiddleware')
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
  features1 varchar(2000) not null,
  features2 varchar(2000) not null,
  features3 varchar(2000) not null,
  features4 varchar(2000) not null,
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

// update table 

// drop table 
// drop = `drop table user`;
// db.run(drop, (err) => {
//   if (err) throw err;
//   console.log('Table deleted successfully');
// });

// alter table
// alter = `delete from products where productcode='asb20'`;
// db.run(alter, (err) => {
//     if (err) throw err;
//   console.log('Table updated successfully');
// })

function addProduct(productcode,productname, description, features1, features2,features3, features4,imageURL,imagethumbnail1,imagethumbnail2,imagethumbnail3,
  rating,reviewed,favourite,brand,category,mrp,currentprice,stock,sold) {
  const sql=`Insert into products(productcode,productname, description, features1, features2,features3, features4,imageURL,imagethumbnail1,imagethumbnail2,imagethumbnail3,
    rating,reviewed,favourite,brand,category,mrp,currentprice,stock,sold) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`;
  const product=[productcode,productname, description, features1, features2,features3, features4,imageURL,imagethumbnail1,imagethumbnail2,imagethumbnail3,
    rating,reviewed,favourite,brand,category,mrp,currentprice,stock,sold];

  db.run(sql,product,err=>{
    if (err) throw err;
    console.log("product details successfully inserted into products table")
  })
}

// addProduct('mo40','OPPO A16K (3GB RAM, 32GB, White)','Get ready to witness the ultimate speed and performance when you buy Oppo A16K online, which comes loaded with various specifications. With 3GB RAM, you can install more applications and run them all together without disturbing the speed of the phone. It comes with sensors like geomagnetic sensor, proximity sensor, light sensor, accelerometer, gravity sensor. It also supports face unlock. The smartphone features a striking screen that gives you a 16.55 cm HD Plus display. Lifes better when you can video chat or watch shows on a bigger screen. HD+ Eye-care will protect your eyes on this giant screen. The resolution is 1600 x 720 pixels. A big 4230 mAh, all-day lithium polymer battery that keeps your phone going without constant recharging, plus a reliable USB port that undergoes 10000 times USB Port Plug-In Tests. Dont worry about overcharging, optimized night charging will protect you. Our next-generation Natural Skin Retouching technology will enhance your features and complexion, ensuring you look naturally charming, without missing any details. Youll look good anywhere and everywhere, all the time',
// 'ColorOS 11.1 Based on Android 11','32GB Storage','Octa-Core MediaTek Helio G35 Processor','IPX4 splash waterproof','images/mobiles/oppo/mo40.webp',
// 'images/mobiles/oppo/mo41.webp',"images/mobiles/oppo/mo42.webp","images/mobiles/oppo/mo43.webp",4.9, 762, false, 'oppo', 'Mobiles',13990, 8999, 787, 654);

// addProduct('mo30','OPPO A76 (6GB RAM, 128GB, Glowing Black)','If you are searching for an allrounder phone with a piece of the astonishing parts stacked in it then the Oppo A76 is for you. It accompanies a Qualcomm Snapdragon 680 Processor in view of the Android 11 working framework which is probably the best processor in the fragment. With this, you are getting an enormous 5000 mAh Battery which will give you a battery reinforcement of very nearly 1 day which is very fair alongside this you are getting a quick charging that will charge your phone immediately. The Oppo A76 is the best phone in this section. With 16.66 cm (6.56") HD+ Display gives you the best and super quality.',
//     '16.66cm (6.56") HD+ Display ',
//     '13MP + 2MP Rear camera| 8MP Front Camera',
//     'Qualcomm Snapdragon 680 Processor',
//     '128GB Storage' ,
//     "images/mobiles/oppo/mo30.webp",
//   "images/mobiles/oppo/mo31.webp",
//   "images/mobiles/oppo/mo32.webp",
//   "images/mobiles/oppo/mo33.webp",
//   4.6, 125, false, 'oppo', 'Mobiles',
//   18499, 16490, 987, 654);

// addProduct('mo30','OPPO A76 (6GB RAM, 128GB, Glowing Black)','If you are searching for an allrounder phone with a piece of the astonishing parts stacked in it then the Oppo A76 is for you. It accompanies a Qualcomm Snapdragon 680 Processor in view of the Android 11 working framework which is probably the best processor in the fragment. With this, you are getting an enormous 5000 mAh Battery which will give you a battery reinforcement of very nearly 1 day which is very fair alongside this you are getting a quick charging that will charge your phone immediately. The Oppo A76 is the best phone in this section. With 16.66 cm (6.56") HD+ Display gives you the best and super quality.',
//     '16.66cm (6.56") HD+ Display ',
//     '13MP + 2MP Rear camera| 8MP Front Camera',
//     'Qualcomm Snapdragon 680 Processor',
//     '128GB Storage ',
//     "images/mobiles/oppo/mo30.webp",
//   "images/mobiles/oppo/mo31.webp",
//   "images/mobiles/oppo/mo32.webp",
//   "images/mobiles/oppo/mo33.webp",
//   4.6, 125, false, 'oppo', 'Mobiles',
//   18499, 16490, 987, 654);

// addProduct('ms10','SAMSUNG Galaxy S22 5G (8GB RAM, 256GB, Green)','If you are looking for a mobile with the best processor in the segment and with the best camera setup then, the Samsung Galaxy S22 is a must-have. It comes with a 5G enabled Snapdragon 8 Gen 1 Processor which is one of the best processors in the segment. With this, you are getting a tremendous 3700 mAH battery which will give you back up of 1 easily in normal use and it also has 45W Super Fast Charging support which means it will charge your phone instantly. The Samsung Galaxy S22 is the best phone in this segment. With 15.39cm (6.1"), Dynamic AMOLED 2X displays give you precision and super quality. You cannot get better than this and at this sensible price.',
// 'Snapdragon 8 Gen 1 Processor','3700 mAh battery','15.39cm (6.1"), Dynamic AMOLED display','50+10+12MP Triple Rear Camera ',
// "images/mobiles/samsung/ms10.webp","images/mobiles/samsung/ms11.webp","images/mobiles/samsung/ms12.webp","images/mobiles/samsung/ms13.webp",
// 4.96, 1024, false, 'samsung', 'Mobiles',76999, 62999, 728, 263)

// addProduct( 'mo10','OPPO A16 (4GB RAM, 64GB, Royal Gold)','Upgrade your photography skills to a new level as the Oppo A16 features a brilliant combination of 13 MP (main camera), 2 MP, and 2 MP camera setup. The main camera takes outstanding shots with absolute clarity. You will be stunned to witness the absolute clarity. Capture your favourite moments and start recording amazing videos with this smartphone. See the difference with brilliantly clear selfies, made possible with an 8 MP selfie camera. It comes loaded with a lot of features that make it a perfect choice of yours. It also supports facial unlock and side fingerprint unlock.',
//     '6.52-Inch HD+ Display','Octa-Core MediaTek Helio G35 Processor','64GB Storage ','4GB RAM for smooth performance',"images/mobiles/oppo/mo10.webp",
//   "images/mobiles/oppo/mo11.webp","images/mobiles/oppo/mo12.webp","images/mobiles/oppo/mo13.webp",4.4, 734, false, 'oppo', 'Mobiles',14999, 12990, 523, 332);

// addProduct('ma10', 'Apple iPhone 14 Pro Max (256GB, Deep Purple)','Display: 6.7 inches (17.00 cm) OLED Display Memory: 256GB ROM Processor: A16 Bionic Chip, Hexa Core Camera: 48 MP + 12 MP + 12 MP Triple Rear & 12 MP Front Camera Battery: Qi Wireless Charging Up to 7.5W Security (Lock): Facial Lock',
// '6.7 inches (17.00 cm) OLED', '48MP Main camera. Mind-blowing detail','A16 Bionic chip','Superfast 5G cellular',
// "images/mobiles/apple/ma10.webp","images/mobiles/apple/ma11.webp","images/mobiles/apple/ma12.webp","images/mobiles/apple/ma13.webp",
//   5, 308, false, 'iPhone', 'Mobiles', 149900.00, 137990.00, 105, 730);

// addProduct('asa10','Apple Airpods (3rd Generation) with Lightning Charging Case','The Apple Airpods (3rd Generation) with Lightning​​​​​​​ Charging Case comes in a lightweight design and ensures a comfortable and secure fit. They are positioned at the ideal angle for comfort and improved audio delivery to your ear. The stem of the third-generation AirPods is 33% shorter and has a force sensor for simple music and phone control. It offers up to 4 hours of talk time and 6 hours of listening time. You can talk or listen for about an hour after just 5 minutes of charging. You may listen for up to 30 hours in total with the lightning charging case.',
// 'With Adaptive EQ', ' Spatial Audio','6 hours of Listening Time','Lightweight Design',
// "images/earphones/apple/asa10.webp","images/earphones/apple/asa11.webp","images/earphones/apple/asa12.webp","images/earphones/apple/asa13.webp",4.5, 312, false, 'Airpods (3rd Generation)', 'HeadPhones',19900, 18999,120,83);


// addProduct('asb10','boAt Airdopes 113 Wireless Gaming Earbuds with Environmental Noise Cancellation  ','Experience the best music listening with the boAt Airdopes 113 Wireless Gaming Earbuds with Environmental Noise Cancellation. Discover the power of its 13mm drivers, which enable the music to ring out clearly and loudly during every jam session. Be astounded by the music of the future rather than merely listening to these earphones. Conversations are as clear as they would be in person thanks to ENx technology. You will always be heard thanks to Airdopes 113. With the aid of the Insta Wake N Pair technology, connecting and unplugging your Airdopes takes only a few seconds',
// 'Orientation Type: In Ear', 'Connectivity: Bluetooth, Version 5.2','Battery Life: 24 Hours','Voice Assistant: Yes',
// "images/earphones/boat/asb10.webp","images/earphones/boat/asb11.webp","images/earphones/boat/asb12.webp","images/earphones/boat/asb13.webp",4.0, 300, false, ' Airdopes 113', 'HeadPhones',1999,1899,210,143);

// addProduct('asb20','boAt Rockerz 558 Bluetooth Headset with Mic ','If you are looking for an efficient wireless headset, then this boAt headset is ideal for you. Its 50 mm drivers bring your audio files to life so that your aural experience is immersive. Moreover, you can enjoy up to 10 hours of playback time with a fully charged battery. Furthermore, it can be connected to your media devices with the help of an AUX cable as well.',
// 'Orientation Type: Over Ear', 'Connectivity: Bluetooth, Version 5.0','Battery Life: 20 Hours Playtime','Noise Cancellation: Noise Isolation',
// "images/earphones/boat/asb20.webp","images/earphones/boat/asb21.webp","images/earphones/boat/asb22.webp","images/earphones/boat/asb23.webp",5, 300, false, ' Rockerz 518', 'HeadPhones',1999,1899,1200,183);


function addUser(username, email, password, isLoggedIn) {
  const User=[username,email,password, isLoggedIn];
  db.run(`Insert into user(username,email,password, isLoggedIn) values(?,?,?,?);`,User,err=>{
    if(err){
      console.log(err.message);
    }
    console.log("user details successfully inserted into user table")
  })
}

function dropTable(table){
  drop = `drop table ${table}`;
  db.run(drop, (err) => {
    if (err) throw err;
    console.log(`${table} Table deleted successfully`);
  });
}

// query the data
sql = `SELECT * FROM products`;
db.all(sql, [], (err, rows) => {
    if(err) return console.log(err.message);
    rows.forEach(row => console.log(row));
});


app.get('/', (req, res) => {
  db.all('SELECT * FROM products limit 3', (err, rows) => {
    if (err) throw err;
    res.render('home', { data: rows , title: 'Homepage' });
  });
});

app.get('/homepage', (req, res) => {
  return res.redirect('/')
})

app.get("/register",(req,res)=>{
  res.redirect("login");
});

app.get("/category",(req,res)=>{
  res.render("pagecategory",{ title: 'Category'});
});

app.get("/aboutUs",(req,res)=>{
  res.render("aboutUs",{ title: 'About Us'});
});

app.get("/login",(req,res)=>{
  res.render("login",{ title: 'Login | Register'});
});

app.post('/login', (req, res) => {
  var email = req.body.email;
  var upass = req.body.password;
  console.log(req.body)
  db.all("select * from user",(err, users) => {
    users.forEach((user) => {
    if ((user.email === email) && (user.password === upass)){
      user.isLoggedIn = true;
      console.log(user)
      res.redirect("/homepage");
    }
  });
  })
});

app.get("/cart",(req,res)=>{
  res.render("cart",{ title: 'Cart'});
});
app.get("/checkout",(req,res)=>{
  res.render("checkout",{ title: 'Checkout'});
});

app.get("/contactUs",(req,res)=>{
  res.render("contactUs",{ title: 'Contact Us'});
});

app.get("/admin",(req,res)=>{
  db.all('SELECT * FROM products', (err, rows) => {
    if (err) throw err;
    res.render('./admin/admin_dashboard', { data: rows , title: 'Admin Dashboard' });
  });
});

app.get("/admin/userDetails",(req,res)=>{
  db.all('SELECT * FROM user', (err, rows) => {
  if (err) throw err;
  res.render('./admin/userDetails', { data: rows , title: 'Admin | User Details' });
});
})

app.get("/admin/productDetails",(req,res)=>{
  db.all('SELECT * FROM products', (err, rows) => {
  if (err) throw err;
  res.render('./admin/productDetails', { data: rows , title: 'Admin | Product Details' });
});
})


app.get("/admin/deleteProduct/:id", (req, res) => {
  var pid =req.params.id;
  drop = `DELETE FROM products WHERE productcode = "${pid}"`
  db.run(drop, (err) => {
    if (err) throw err;
    console.log(`product deleted successfully`);
    res.redirect("/admin/productDetails")
  });
})

// app.get("/admin/deleteUser/:id", (req, res) => {
//   var pid =req.params.id;
//   drop = `DELETE FROM user WHERE email = "${pid}"`
//   console.log(req)
//   db.run(drop, (err) => {
//     if (err) throw err;
//     // console.log(`User deleted successfully`);
//     res.redirect("/admin/userDetails")
//   });

  // db.all('SELECT * FROM products', (err, rows) => {
  //   if (err) throw err;
  //   res.render('./admin/productDetails', { data: rows , title: 'Product Details' });
  // });
// })


// app.get('/isAuthenticated', (req, res) => {
  
// })

app.post("/register",(req,res)=>{
  console.log(req.body)
  // const sql="Insert into user(username,email,password, isLoggedIn) values(?,?,?,?);";
  // const User=[req.body.name,req.body.email,req.body.password, false];
  // db.run(sql,User,err=>{
  //   if(err){
  //     console.log(err.message);
  //   }
  //   console.log(User)
  //   res.redirect("/homepage");
  // })
  addUser(req.body.name,req.body.email,req.body.password, false)
  res.redirect("/homepage");
});

logindb = `SELECT * FROM user`;
db.all(logindb, [], (err, rows) => {
    if(err) return console.log(err.message);
    rows.forEach(row => console.log(row));
});

app.get("/myAccount",(req,res)=>{
  res.render("user_profile",{ title: 'User Profile'});
});

app.get("/editProfile",(req,res)=>{
  res.render("edit_profile",{ title: 'My Account'});
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
//   db.all("SELECT * FROM products where productname LIKE '%`${text}`%'", (err, searchproducts) => {
//   if (err) throw err;
//   res.render('products', { data: searchproducts , title: 'Search Results' });
// });
// })


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


