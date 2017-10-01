const express = require('express');
const fs = require('fs');
const hbs = require('hbs');
const port=process.env.PORT||3000;
var app=express();

app.use((req,res,next)=>{
  var now=new Date().toString();
  var log=`${now}:${req.method},${req.url}`
  console.log(log);
  fs.appendFile('server.log',log+'\n')
  next();
});

// app.use((req,res,next)=>{
//   res.render('maintenance.hbs')
// });
app.use(express.static(__dirname+'/public'));

hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine','hbs');
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

app.get('/',(req,res)=>{
  // res.send('Hello express!');
  // res.send({
  //   name:'kamlesh',
  //   age:'27',
  //   city:'pune'
  // });
  res.render('home.hbs',{
    pageTitle:'Home Page',
    welcomeMessage:'Welcome to home page'

  });

});

app.get('/about',(req,res)=>{
  // res.send('inside about page')
  res.render('about.hbs',{
    pageTitle:'aboutPage'
  })
});

app.get('/bad',(req,res)=>{
  res.send({
    errorMessage:'Unable to handle request'
  })
})

app.listen(port,()=>{
  console.log(`server is up at port ${port}`);
});
